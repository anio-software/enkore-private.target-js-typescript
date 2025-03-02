import ts from "typescript"

import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.d.mts"
import type {MyTSProgram} from "./MyTSProgram.d.mts"

export function emit(myProgram: MyTSProgram): {
	emitSkipped: boolean
	diagnosticMessages: MyTSDiagnosticMessage[]
	emittedFiles: Map<string, string>
} {
	const {tsCompilerHost, tsProgram} = myProgram

	const emittedFiles: Map<string, string> = new Map()
	const savedCompilerHostWriteFile = tsCompilerHost.writeFile
	const savedCWD = process.cwd()

	try {
		tsCompilerHost.writeFile = (filePath, contents) => {
			emittedFiles.set(filePath, contents)
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

		return {
			emitSkipped: result.emitSkipped,
			diagnosticMessages,
			emittedFiles
		}
	} finally {
		tsCompilerHost.writeFile = savedCompilerHostWriteFile
		process.chdir(savedCWD)
	}
}
