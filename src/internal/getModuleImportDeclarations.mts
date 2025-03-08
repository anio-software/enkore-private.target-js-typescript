import ts from "typescript"

import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"
import type {MyTSImportDeclaration} from "#~src/export/MyTSImportDeclaration.d.mts"

import {filterNodes} from "@aniojs/node-ts-utils"
import {convert} from "#~src/export/convert.mts"

export function getModuleImportDeclarations(
	myProgram: MyTSProgram,
	filePath: string
): MyTSImportDeclaration[] {
	const sourceFile = myProgram.getSourceFile(filePath)

	const nodes = filterNodes(sourceFile, node => {
		return ts.isImportDeclaration(node)
	}) as ts.ImportDeclaration[]

	return nodes.map(node => {
		return convert(node)
	})
}
