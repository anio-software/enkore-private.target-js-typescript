import ts from "typescript"

import type {MyTSVirtualProgramFile} from "./MyTSVirtualProgramFile.mts"
import type {MyTSCompilerOptions} from "./MyTSCompilerOptions.mts"
import type {MyTSProgram, Internal as MyTSProgramInternal} from "#~src/types/MyTSProgram.mts"
import {createMyTSModule} from "#~src/createMyTSModule.mts"
import {resolvePathSync} from "@anio-software/pkg.node-fs"
import {tsDefineVirtualProgramFile} from "./tsDefineVirtualProgramFile.mts"
import path from "node:path"
import {getMyTSCompilerOptionsInternals} from "#~src/getMyTSCompilerOptionsInternals.mts"
import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.mts"
import {convertTSDiagnostic} from "#~src/utils/convertTSDiagnostic.mts"
import {createProgramSourceDependencyGraph} from "#~src/createProgramSourceDependencyGraph.mts"

export function tsCreateProgram(
	userProjectRoot: string,
	input: (string|MyTSVirtualProgramFile)[],
	myCompilerOptions: MyTSCompilerOptions
): {
	diagnosticMessages: MyTSDiagnosticMessage[]
	program: MyTSProgram
} {
	const {tsCompilerOptions} = getMyTSCompilerOptionsInternals(myCompilerOptions)
	const projectRoot = resolvePathSync(userProjectRoot, ["dir:regular"])

	tsCompilerOptions.skipLibCheck = false;
	tsCompilerOptions.declaration = true;
	tsCompilerOptions.emitDeclarationOnly = true;

	//
	// all input paths are relative to the project root
	// in order for typescript to correctly pick them up
	// we temporarily change into the project root's directory
	//
	// testing shows that the working directory isn't relevant after
	// creating the program with ts.createProgram
	//
	const savedCWD = process.cwd()

	try {
		process.chdir(projectRoot)

		const inputFilePaths: string[] = []
		const virtualFiles: Map<string, string> = new Map()

		for (const entry of input) {
			if (typeof entry === "string") {
				let entryPath = entry

				if (!entryPath.startsWith("/")) {
					entryPath = resolvePathSync(
						path.join(projectRoot, entryPath), ["file:regular"]
					)
				} else if (!entryPath.startsWith(projectRoot)) {
					throw new Error(
						`Input file must be located within the provided project root.`
					)
				}

				inputFilePaths.push(entryPath)

				continue
			}

			if (entry.path.startsWith("/")) {
				throw new Error(
					`Absolute virtual files are not supported.`
				)
			}

			const absoluteVirtualFilePath = path.join(projectRoot, entry.path)

			virtualFiles.set(absoluteVirtualFilePath, entry.content)
			inputFilePaths.push(absoluteVirtualFilePath)
		}

		const tsCompilerHost = ts.createCompilerHost(tsCompilerOptions, true)

		tsCompilerHost.jsDocParsingMode = ts.JSDocParsingMode.ParseAll

		tsCompilerHost.fileExists = (filePath) => {
			return virtualFiles.has(filePath) || ts.sys.fileExists(filePath)
		}

		tsCompilerHost.readFile = (filePath) => {
			if (virtualFiles.has(filePath)) {
				return virtualFiles.get(filePath)
			}

			return ts.sys.readFile(filePath)
		}

		const tsProgram = ts.createProgram(
			inputFilePaths, tsCompilerOptions, tsCompilerHost
		)

		const tsChecker = tsProgram.getTypeChecker()

		const internal: MyTSProgramInternal = {
			cachedModules: new Map(),
			tsCompilerHost,
			tsCompilerOptions,
			tsProgram,
			tsChecker,
			getTSSourceFile(filePath) {
				if (!filePath.startsWith(projectRoot)) {
					throw new Error(
						`Internal Error: filePath must be absolute and start with the project root.`
					)
				}

				return tsProgram.getSourceFile(filePath)
			},
			sourceDependencyGraph: createProgramSourceDependencyGraph(
				projectRoot, inputFilePaths, tsProgram
			),
			__self: {} as MyTSProgram
		}

		const diagnostics = [
			...tsProgram.getGlobalDiagnostics(),
			...tsProgram.getConfigFileParsingDiagnostics(),
			...tsProgram.getOptionsDiagnostics()
		]

		const myProgram: MyTSProgram = {
			_myTSProgramBrand: undefined,
			projectRoot,
			compilerOptions: myCompilerOptions,
			getModule(filePath) {
				// filePath must start with the project root
				if (!filePath.startsWith("/")) {
					filePath = path.join(projectRoot, filePath)
				}

				filePath = path.normalize(filePath)

				if (internal.cachedModules.has(filePath)) {
					return internal.cachedModules.get(filePath)!
				}

				const mod = createMyTSModule(internal.__self, filePath)

				// no such module / source file
				if (!mod) {
					return undefined
				}

				internal.cachedModules.set(filePath, mod)

				return mod
			},
			getVirtualModule(virtualFilePath) {
				return internal.__self.getModule(
					tsDefineVirtualProgramFile(virtualFilePath, "").path
				)
			},
			__internal: internal
		}

		internal.__self = myProgram

		return {
			diagnosticMessages: diagnostics.map(diag => {
				return convertTSDiagnostic(diag)
			}),
			program: myProgram
		}
	} finally {
		process.chdir(savedCWD)
	}
}
