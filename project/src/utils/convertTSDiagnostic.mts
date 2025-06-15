import ts from "typescript"
import type {MyTSDiagnosticMessage} from "../types/MyTSDiagnosticMessage.mts"

export function convertTSDiagnostic(
	diagnostic: ts.Diagnostic,
	shortFileName?: boolean
): MyTSDiagnosticMessage {
	const {code, messageText} = diagnostic
	const message = ts.flattenDiagnosticMessageText(messageText, "\n")

	if (diagnostic.file && typeof diagnostic.start !== "undefined") {
		const {line, character} = diagnostic.file.getLineAndCharacterOfPosition(
			diagnostic.start
		)

		const origin = {
			filePath: diagnostic.file.fileName,
			line: line + 1,
			character: character + 1
		}

		return {origin, code, message}
	}

	return {origin: {}, code, message}
}
