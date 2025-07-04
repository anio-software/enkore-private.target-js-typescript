import ts from "typescript"
import {printNode} from "@anio-software/pkg.node-ts-utils"

import type {
	StarImport
} from "#~src/types/node/MyTSImportDeclaration.mts"

export function convertStarImport(
	importNode: ts.ImportDeclaration
): StarImport|null {
	if (!importNode.importClause) return null

	const moduleSpecifier = printNode(importNode.moduleSpecifier).slice(1, -1)
	const importClause = importNode.importClause

	if (importClause.namedBindings && ts.isNamespaceImport(importClause.namedBindings)) {
		return {
			kind: "star",
			moduleSpecifier,
			identifier: printNode(importClause.namedBindings.name),
			isTypeOnly: importClause.isTypeOnly
		}
	}

	return null
}
