import ts from "typescript"

import type {
	StarImport
} from "#~src/internal/types/MyTSImportDeclaration.d.mts"

export function convertStarImport(
	importNode: ts.ImportDeclaration
): StarImport|null {
	if (!importNode.importClause) return null

	const sourceFile = importNode.getSourceFile()
	const moduleSpecifier = importNode.moduleSpecifier.getText(sourceFile).slice(1, -1)
	const importClause = importNode.importClause

	if (importClause.namedBindings && ts.isNamespaceImport(importClause.namedBindings)) {
		return {
			kind: "star",
			moduleSpecifier,
			identifier: importClause.namedBindings.name.getText(sourceFile),
			isTypeOnly: importClause.isTypeOnly
		}
	}

	return null
}
