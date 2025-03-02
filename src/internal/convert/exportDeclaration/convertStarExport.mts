import ts from "typescript"

import type {
	StarExport
} from "#~src/internal/types/MyTSExportDeclaration.d.mts"

export function convertStarExport(
	exportNode: ts.ExportDeclaration
): StarExport|null {
	if (exportNode.exportClause) return null
	if (!exportNode.moduleSpecifier) return null

	const sourceFile = exportNode.getSourceFile()
	const moduleSpecifier = exportNode.moduleSpecifier.getText(sourceFile).slice(1, -1)

	return {
		_myDeclarationTSNode: exportNode,
		_myDeclarationType: "ExportDeclaration",

		kind: "star",
		moduleSpecifier,
		isTypeOnly: exportNode.isTypeOnly
	}
}
