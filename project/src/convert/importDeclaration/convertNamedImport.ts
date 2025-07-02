import ts from "typescript"
import {printNode} from "@anio-software/pkg.node-ts-utils"

import type {
	NamedImportMember,
	NamedImport
} from "#~src/types/node/MyTSImportDeclaration.ts"

export function convertNamedImport(
	importNode: ts.ImportDeclaration
): NamedImport|null {
	if (!importNode.importClause) return null

	const moduleSpecifier = printNode(importNode.moduleSpecifier).slice(1, -1)
	const importClause = importNode.importClause

	if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
		const members: NamedImportMember[] = []
		let isTypeOnly = importNode.importClause.isTypeOnly

		for (const element of importClause.namedBindings.elements) {
			const identifier = printNode(element.name)
			let propertyName = ""

			if (element.propertyName) {
				propertyName = printNode(element.propertyName)
			} else {
				propertyName = identifier
			}

			members.push({
				propertyName,
				identifier,
				// if "import type {}" is used, all members are also type only
				isTypeOnly: element.isTypeOnly || isTypeOnly
			})
		}

		return {
			kind: "named",
			moduleSpecifier,
			isTypeOnly,
			members
		}
	}

	return null
}
