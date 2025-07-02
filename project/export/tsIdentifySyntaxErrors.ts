import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.mts"
import type {MyTSDiagnosticMessage} from "#~src/types/MyTSDiagnosticMessage.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {tsIdentifySyntaxErrorsFromCode} from "./tsIdentifySyntaxErrorsFromCode.mts"

export function tsIdentifySyntaxErrors(
	source: MyTSSourceFile
): MyTSDiagnosticMessage[] {
	const {tsSourceFile} = getMyTSSourceFileInternals(source)

	return tsIdentifySyntaxErrorsFromCode(
		source.code, tsSourceFile.fileName.endsWith(".tsx")
	)
}
