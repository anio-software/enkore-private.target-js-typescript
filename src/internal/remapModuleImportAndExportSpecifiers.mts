import ts from "typescript"

import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"
import type {MyTSImportDeclaration} from "#~src/export/MyTSImportDeclaration.d.mts"
import type {MyTSExportDeclaration} from "#~src/export/MyTSExportDeclaration.d.mts"
import {convert} from "#~src/export/convert.mts"
import {
	expandModuleImportAndExportDeclarations as expand,
	remapModuleImportAndExportSpecifiers as remap
} from "@aniojs/node-ts-utils"

export type Mapper = (
	declaration: MyTSImportDeclaration|MyTSExportDeclaration
) => string|undefined

export function remapModuleImportAndExportSpecifiers(
	myProgram: MyTSProgram,
	filePath: string,
	mapper: Mapper
): ts.Node {
	const sourceFile = myProgram.getSourceFile(filePath)

	const expanded = expand(sourceFile)
	const remapped = remap(expanded, (decl) => {
		return mapper(convert(decl))
	})

	return remapped as ts.Node
}
