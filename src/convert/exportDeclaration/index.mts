import ts from "typescript"
import type {MyTSExportDeclaration} from "#~src/export/MyTSExportDeclaration.d.mts"

import {convertNamedExport} from "./convertNamedExport.mts"
import {convertStarExport} from "./convertStarExport.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import {createMyTSNode} from "#~src/createMyTSNode.mts"

export function convertExportDeclaration(
	exportNode: ts.ExportDeclaration
): MyTSExportDeclaration {
	const sourceFile = createMyTSSourceFile(exportNode.getSourceFile())

	const namedExport = convertNamedExport(exportNode)
	if (namedExport) return createMyTSNode("ExportDeclaration", namedExport, {sourceFile})

	const starExport = convertStarExport(exportNode)
	if (starExport) return createMyTSNode("ExportDeclaration", starExport, {sourceFile})

	throw new Error(
		`Unable to convert export declaration.`
	)
}
