import ts from "typescript"
import type {MyTSDiagnosticMessage} from "../types/MyTSDiagnosticMessage.mts"
import path from "node:path"

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

		const fileName = shortFileName === true ? path.basename(diagnostic.file.fileName) : diagnostic.file.fileName

		return {
			code,
			message: `${fileName} (${line + 1},${character + 1}): ${message}`
		}
	}

	return {code, message}
}
