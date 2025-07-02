import ts from "typescript"
import {printNode} from "@anio-software/pkg.node-ts-utils"

import type {
	AnonymousImport
} from "#~src/types/node/MyTSImportDeclaration.ts"

export function convertAnonymousImport(
	importNode: ts.ImportDeclaration
): AnonymousImport|null {
	if (importNode.importClause) return null

	const moduleSpecifier = printNode(importNode.moduleSpecifier).slice(1, -1)

	return {
		kind: "anonymous",
		moduleSpecifier,
		isTypeOnly: false
	}
}
