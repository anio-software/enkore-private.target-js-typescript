import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.ts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.ts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.ts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.ts"
import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.ts"
import {convert} from "#~src/convert/convert.ts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.ts"
import {getMyTSTransformationContextInternals} from "#~src/getMyTSTransformationContextInternals.ts"

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
