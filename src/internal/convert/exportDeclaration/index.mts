import ts from "typescript"
import type {MyTSExportDeclaration} from "#~src/export/MyTSExportDeclaration.d.mts"

import {convertNamedExport} from "./convertNamedExport.mts"
import {convertStarExport} from "./convertStarExport.mts"

export function convertExportDeclaration(
	exportNode: ts.ExportDeclaration
): MyTSExportDeclaration {
	const namedExport = convertNamedExport(exportNode)
	if (namedExport) return namedExport

	const starExport = convertStarExport(exportNode)
	if (starExport) return starExport

	throw new Error(
		`Unable to convert export declaration.`
	)
}
