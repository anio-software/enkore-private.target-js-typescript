import ts from "typescript"
import type {MyTSDiagnosticMessage} from "../types/MyTSDiagnosticMessage.d.mts"

export function convertTSDiagnostic(
	diagnostic: ts.Diagnostic
): MyTSDiagnosticMessage {
	const {code, messageText} = diagnostic
	const message = ts.flattenDiagnosticMessageText(messageText, "\n")

	if (diagnostic.file && typeof diagnostic.start !== "undefined") {
		const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(
			diagnostic.start
		)

		return {
			code,
			message: `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
		}
	}

	return {code, message}
}
