import ts from "typescript"
import type {MyTSExportDeclaration} from "#~export/MyTSExportDeclaration.ts"

import {convertNamedExport} from "./convertNamedExport.ts"
import {convertStarExport} from "./convertStarExport.ts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.ts"
import {createMyTSNode} from "#~src/createMyTSNode.ts"

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
