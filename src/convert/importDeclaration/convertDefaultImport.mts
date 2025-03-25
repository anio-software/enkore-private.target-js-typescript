import ts from "typescript"
import {printNode} from "@aniojs/node-ts-utils"

import type {
	DefaultImport
} from "#~src/types/node/MyTSImportDeclaration.mts"

export function convertDefaultImport(
	importNode: ts.ImportDeclaration
): DefaultImport|null {
	if (!importNode.importClause) return null

	const moduleSpecifier = printNode(importNode.moduleSpecifier).slice(1, -1)
	const importClause = importNode.importClause

	if (importClause.namedBindings) {
		if (ts.isNamedImports(importClause.namedBindings)) {
			return null
		} else if (ts.isNamespaceImport(importClause.namedBindings)) {
			return null
		}
	}

	return {
		kind: "default",
		moduleSpecifier,
		identifier: printNode(importClause.name!),
		isTypeOnly: importClause.isTypeOnly
	}
}
