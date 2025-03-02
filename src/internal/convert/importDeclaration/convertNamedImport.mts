import ts from "typescript"

import type {
	NamedImportMember,
	NamedImport
} from "#~src/internal/types/MyTSImportDeclaration.d.mts"

export function convertNamedImport(
	importNode: ts.ImportDeclaration
): NamedImport|null {
	if (!importNode.importClause) return null

	const sourceFile = importNode.getSourceFile()
	const moduleSpecifier = importNode.moduleSpecifier.getText(sourceFile).slice(1, -1)
	const importClause = importNode.importClause

	if (importClause.namedBindings && ts.isNamedImports(importClause.namedBindings)) {
		const members: NamedImportMember[] = []
		let isTypeOnly = importNode.importClause.isTypeOnly

		for (const element of importClause.namedBindings.elements) {
			const identifier = element.name.getText(sourceFile)
			let propertyName = ""

			if (element.propertyName) {
				propertyName = element.propertyName.getText(sourceFile)
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
			_myDeclarationTSNode: importNode,
			_myDeclarationType: "ImportDeclaration",

			kind: "named",
			moduleSpecifier,
			isTypeOnly,
			members
		}
	}

	return null
}
