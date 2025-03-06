import ts from "typescript"

import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.d.mts"
import type {MyTSProgram} from "./MyTSProgram.d.mts"
import {createProgram} from "./createProgram.mts"
import {defineVirtualProgramFile} from "./defineVirtualProgramFile.mts"

export function emit(myProgram: MyTSProgram): {
	emitSkipped: boolean
	diagnosticMessages: MyTSDiagnosticMessage[]
	emittedFiles: Map<string, string>
	newProgram: MyTSProgram
} {
	const {projectRoot, tsCompilerHost, tsProgram} = myProgram

	const emittedFiles: Map<string, string> = new Map()
	const savedCompilerHostWriteFile = tsCompilerHost.writeFile
	const savedCWD = process.cwd()

	try {
		tsCompilerHost.writeFile = (filePath, contents) => {
			// we know "projectRoot" ends with a slash (/) because
			// of how @aniojs/node-fs resolvePath works.
			if (!filePath.startsWith(projectRoot)) return

			emittedFiles.set(filePath.slice(projectRoot.length), contents)
		}

		process.chdir(myProgram.projectRoot)

		const result = tsProgram.emit()
		const diagnosticMessages: MyTSDiagnosticMessage[] = []
		const allDiagnostics = ts.getPreEmitDiagnostics(tsProgram).concat(result.diagnostics)

		for (const diagnostic of allDiagnostics) {
			const {code, messageText} = diagnostic
			const message = ts.flattenDiagnosticMessageText(messageText, "\n")

			if (diagnostic.file && diagnostic.start) {
				const {line, character} = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start)

				diagnosticMessages.push({
					code,
					message: `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
				})
			} else {
				diagnosticMessages.push({code, message})
			}
		}

		const newProgram = createProgram(
			myProgram.projectRoot, [
				...emittedFiles.entries()
			].map(([filePath, contents]) => {
				return defineVirtualProgramFile(
					filePath, contents
				)
			}), myProgram.tsCompilerOptions
		)

		return {
			emitSkipped: result.emitSkipped,
			diagnosticMessages,
			emittedFiles,
			newProgram
		}
	} finally {
		tsCompilerHost.writeFile = savedCompilerHostWriteFile
		process.chdir(savedCWD)
	}
}
