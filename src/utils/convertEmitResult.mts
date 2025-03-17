import ts from "typescript"
import type {MyTSDiagnosticMessage} from "../types/MyTSDiagnosticMessage.d.mts"

export function convertEmitResult(
	tsProgram: ts.Program,
	result: ts.EmitResult
): {
	emitSkipped: boolean,
	diagnosticMessages: MyTSDiagnosticMessage[]
} {
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
		diagnosticMessages
	}
}
