import ts from "typescript"

import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSImportDeclaration} from "#~src/export/MyTSImportDeclaration.d.mts"

import {filterNodes} from "#~src/internal/utils/filterNodes.mts"
import {convert} from "./convert.mts"

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
