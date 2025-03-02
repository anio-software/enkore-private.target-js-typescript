import ts from "typescript"

import type {
	DefaultImport
} from "#~src/internal/types/MyTSImportDeclaration.d.mts"

export function convertDefaultImport(
	importNode: ts.ImportDeclaration
): DefaultImport|null {
	if (!importNode.importClause) return null

	const sourceFile = importNode.getSourceFile()
	const moduleSpecifier = importNode.moduleSpecifier.getText(sourceFile).slice(1, -1)
	const importClause = importNode.importClause

	if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
		return null
	}

	if (importClause.namedBindings && ts.isNamespaceImport(importClause.namedBindings)) {
		return null
	}

	return {
		_myDeclarationTSNode: importNode,
		_myDeclarationType: "ImportDeclaration",

		kind: "default",
		moduleSpecifier,
		identifier: importClause.name!.getText(sourceFile),
		isTypeOnly: importClause.isTypeOnly
	}
}
