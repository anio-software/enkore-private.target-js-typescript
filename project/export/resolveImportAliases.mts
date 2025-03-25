import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.mts"
import {getMyTSTransformationContextInternals} from "#~src/getMyTSTransformationContextInternals.mts"

import {
	transformSourceFile,
	resolveImportAliases as resolveAliases
} from "@aniojs/node-ts-utils"

export function resolveImportAliases(
	transformContext: MyTSTransformationContext|undefined,
	aliases: Record<string, string>
): MyTSSourceFileTransformer {
	const context = transformContext ? getMyTSTransformationContextInternals(
		transformContext
	).tsTransformationContext : undefined

	return (inputSourceFile) => {
		const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

		const transformed = transformSourceFile(tsSourceFile, resolveAliases(aliases), context)

		return createMyTSSourceFile(transformed, undefined)
	}
}
