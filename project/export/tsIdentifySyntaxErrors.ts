import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.ts"
import type {MyTSDiagnosticMessage} from "#~src/types/MyTSDiagnosticMessage.ts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.ts"
import {tsIdentifySyntaxErrorsFromCode} from "./tsIdentifySyntaxErrorsFromCode.ts"

export function tsIdentifySyntaxErrors(
	source: MyTSSourceFile
): MyTSDiagnosticMessage[] {
	const {tsSourceFile} = getMyTSSourceFileInternals(source)

	return tsIdentifySyntaxErrorsFromCode(
		source.code, tsSourceFile.fileName.endsWith(".tsx")
	)
}
