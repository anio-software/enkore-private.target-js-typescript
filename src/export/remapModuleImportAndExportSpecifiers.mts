import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.d.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.d.mts"
import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.d.mts"
import {convert} from "#~src/convert/convert.mts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.d.mts"
import {getMyTSTransformationContextInternals} from "#~src/getMyTSTransformationContextInternals.mts"

import {
	astTransform,
	remapModuleImportAndExportSpecifiers as remap
} from "@aniojs/node-ts-utils"

type Mapper = (
	moduleSpecifier: string,
	declaration: MyTSImportDeclaration|MyTSExportDeclaration
) => string|undefined

export function remapModuleImportAndExportSpecifiers(
	transformContext: MyTSTransformationContext|undefined,
	mapper: Mapper
): MyTSSourceFileTransformer {
	const context = transformContext ? getMyTSTransformationContextInternals(
		transformContext
	).tsTransformationContext : undefined

	return (inputSourceFile) => {
		const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

		const transformed = astTransform(tsSourceFile, remap((moduleSpecifier, decl) => {
			return mapper(moduleSpecifier, convert(decl))
		}), context)

		return createMyTSSourceFile(transformed, undefined)
	}
}
