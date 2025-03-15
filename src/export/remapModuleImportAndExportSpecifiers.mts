import type {MyTSModule} from "./MyTSModule.d.mts"
import type {MyTSSourceFile} from "./MyTSSourceFile.d.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.d.mts"
import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.d.mts"
import {convert} from "#~src/convert/convert.mts"

import {
	astTransform,
	remapModuleImportAndExportSpecifiers as transformRemap
} from "@aniojs/node-ts-utils"

type Mapper = (
	moduleSpecifier: string,
	declaration: MyTSImportDeclaration|MyTSExportDeclaration
) => string|undefined

export function remapModuleImportAndExportSpecifiers(
	src: MyTSModule|MyTSSourceFile,
	mapper: Mapper
): MyTSSourceFile {
	const inputSourceFile = "source" in src ? src.source : src
	const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

	const transformed = astTransform(
		tsSourceFile, transformRemap((moduleSpecifier, decl) => {
			return mapper(moduleSpecifier, convert(decl))
		})
	)

	return createMyTSSourceFile(transformed, undefined)
}
