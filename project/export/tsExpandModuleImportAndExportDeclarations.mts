import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.mts"
import {getMyTSTransformationContextInternals} from "#~src/getMyTSTransformationContextInternals.mts"

import {
	transformSourceFile,
	expandModuleImportAndExportDeclarations as expand
} from "@anio-software/pkg.node-ts-utils"

export function tsExpandModuleImportAndExportDeclarations(
	transformContext: MyTSTransformationContext|undefined
): MyTSSourceFileTransformer {
	const context = transformContext ? getMyTSTransformationContextInternals(
		transformContext
	).tsTransformationContext : undefined

	return (inputSourceFile) => {
		const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

		const transformed = transformSourceFile(tsSourceFile, expand(), context)

		return createMyTSSourceFile(transformed, undefined)
	}
}
