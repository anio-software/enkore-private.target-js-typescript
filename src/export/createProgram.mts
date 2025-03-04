import ts from "typescript"

import type {VirtualProgramFile} from "./VirtualProgramFile.d.mts"
import type {MyTSProgram, Internal as MyTSProgramInternal} from "#~src/internal/types/MyTSProgram.d.mts"

export function createProgram(
	projectRoot: string,
	input: (string|VirtualProgramFile)[],
	tsCompilerOptions: ts.CompilerOptions
): MyTSProgram {
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
			if (Object.prototype.toString.call(entry) === "[object String]") {
				inputFilePaths.push(entry as string)

				continue
			}

			const virtualFile = entry as VirtualProgramFile

			virtualFiles.set(virtualFile.path, virtualFile.content)
			inputFilePaths.push(virtualFile.path)
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
			cachedModules: new Map()
		}

		return {
			projectRoot,
			tsProgram,
			tsChecker,
			tsCompilerHost,
			tsCompilerOptions,
			getSourceFile(filePath) {
				const sourceFile = tsProgram.getSourceFile(filePath)

				if (!sourceFile) {
					throw new Error(`No such source file '${filePath}'.`)
				}

				return sourceFile
			},
			__internal: internal
		}
	} finally {
		process.chdir(savedCWD)
	}
}
