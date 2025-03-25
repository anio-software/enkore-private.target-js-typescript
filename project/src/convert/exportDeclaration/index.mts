import ts from "typescript"
import type {MyTSExportDeclaration} from "#~export/MyTSExportDeclaration.mts"

import {convertNamedExport} from "./convertNamedExport.mts"
import {convertStarExport} from "./convertStarExport.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import {createMyTSNode} from "#~src/createMyTSNode.mts"

export function convertExportDeclaration(
	exportNode: ts.ExportDeclaration
): MyTSExportDeclaration {
	const sourceFile = createMyTSSourceFile(exportNode.getSourceFile())
	const meta = {tsNode: exportNode, sourceFile}

	const namedExport = convertNamedExport(exportNode)
	if (namedExport) return createMyTSNode("ExportDeclaration", namedExport, meta)

	const starExport = convertStarExport(exportNode)
	if (starExport) return createMyTSNode("ExportDeclaration", starExport, meta)

	throw new Error(
		`Unable to convert export declaration.`
	)
}
