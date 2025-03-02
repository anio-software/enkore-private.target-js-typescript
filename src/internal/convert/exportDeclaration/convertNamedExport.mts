import ts from "typescript"

import type {
	NamedExportMember,
	NamedExport
} from "#~src/internal/types/MyTSExportDeclaration.d.mts"

export function convertNamedExport(
	exportNode: ts.ExportDeclaration
): NamedExport|null {
	if (!exportNode.exportClause) return null

	const sourceFile = exportNode.getSourceFile()
	const moduleSpecifier = exportNode.moduleSpecifier ? exportNode.moduleSpecifier.getText(sourceFile).slice(1, -1) : undefined
	const exportClause = exportNode.exportClause

	if (ts.isNamedExports(exportClause)) {
		const members: NamedExportMember[] = []

		for (const element of exportClause.elements) {
			const identifier = element.name.getText(sourceFile)
			let propertyName = ""

			if (element.propertyName) {
				propertyName = element.propertyName.getText(sourceFile)
			} else {
				propertyName = identifier
			}

			members.push({
				identifier,
				propertyName,
				// if "export type {}" is used, all members are also type only
				isTypeOnly: element.isTypeOnly || exportNode.isTypeOnly
			})
		}

		return {
			_myDeclarationTSNode: exportNode,
			_myDeclarationType: "ExportDeclaration",

			kind: "named",
			moduleSpecifier,
			members,
			isTypeOnly: exportNode.isTypeOnly
		}
	}

	return null
}
