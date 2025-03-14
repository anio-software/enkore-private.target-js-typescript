import ts from "typescript"
import {printNode} from "@aniojs/node-ts-utils"

import type {
	StarExport
} from "#~src/types/MyTSExportDeclaration.d.mts"

export function convertStarExport(
	exportNode: ts.ExportDeclaration
): StarExport|null {
	if (exportNode.exportClause) return null
	if (!exportNode.moduleSpecifier) return null

	const moduleSpecifier = printNode(exportNode.moduleSpecifier).slice(1, -1)

	return {
		kind: "star",
		moduleSpecifier,
		isTypeOnly: exportNode.isTypeOnly
	}
}
