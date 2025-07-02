import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.ts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.ts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.ts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.ts"
import {getMyTSTransformationContextInternals} from "#~src/getMyTSTransformationContextInternals.ts"

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
