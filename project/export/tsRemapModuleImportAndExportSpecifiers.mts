import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.mts"
import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.mts"
import {convert} from "#~src/convert/convert.mts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.mts"
import {getMyTSTransformationContextInternals} from "#~src/getMyTSTransformationContextInternals.mts"

import {
	transformSourceFile,
	remapModuleImportAndExportSpecifiers as remap
} from "@anio-software/pkg.node-ts-utils"

type Mapper = (
	moduleSpecifier: string,
	declaration: MyTSImportDeclaration|MyTSExportDeclaration,
	remove: () => symbol
) => string|undefined|symbol

export function tsRemapModuleImportAndExportSpecifiers(
	transformContext: MyTSTransformationContext|undefined,
	mapper: Mapper
): MyTSSourceFileTransformer {
	const context = transformContext ? getMyTSTransformationContextInternals(
		transformContext
	).tsTransformationContext : undefined

	return (inputSourceFile) => {
		const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

		const transformed = transformSourceFile(tsSourceFile, remap((moduleSpecifier, decl, remove) => {
			return mapper(moduleSpecifier, convert(decl), remove)
		}), context)

		return createMyTSSourceFile(transformed, undefined)
	}
}
