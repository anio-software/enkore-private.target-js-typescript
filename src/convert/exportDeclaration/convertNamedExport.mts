import ts from "typescript"
import {printNode} from "@aniojs/node-ts-utils"

import type {
	NamedExportMember,
	NamedExport
} from "#~src/types/node/MyTSExportDeclaration.mts"

export function convertNamedExport(
	exportNode: ts.ExportDeclaration
): NamedExport|null {
	if (!exportNode.exportClause) return null
	if (!exportNode.moduleSpecifier) return null

	const moduleSpecifier = printNode(exportNode.moduleSpecifier).slice(1, -1)
	const exportClause = exportNode.exportClause

	if (ts.isNamedExports(exportClause)) {
		const members: NamedExportMember[] = []

		for (const element of exportClause.elements) {
			const identifier = printNode(element.name)
			let propertyName = ""

			if (element.propertyName) {
				propertyName = printNode(element.propertyName)
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
			kind: "named",
			moduleSpecifier,
			members,
			isTypeOnly: exportNode.isTypeOnly
		}
	}

	return null
}
