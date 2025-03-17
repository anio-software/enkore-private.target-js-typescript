import type {MyTSSourceFile} from "./MyTSSourceFile.d.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {stripTypes as impl} from "#~src/utils/stripTypes.mts"

export function stripTypes(
	source: MyTSSourceFile,
	rewriteImportExtensions?: boolean
) {
	const {tsSourceFile} = getMyTSSourceFileInternals(source)

	return impl(
		tsSourceFile.text, {
			filename: tsSourceFile.fileName,
			rewriteImportExtensions: rewriteImportExtensions === true
		}
	)
}
