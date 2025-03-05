import ts from "typescript"

import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"
import {convert} from "#~src/export/convert.mts"
import {filterNodes} from "#~src/internal/utils/filterNodes.mts"

export function getModuleImportAndExportSpecifiers(
	myProgram: MyTSProgram,
	filePath: string
) {
	const sourceFile = myProgram.getSourceFile(filePath)

	const nodes = filterNodes(sourceFile, node => {
		if (ts.isImportDeclaration(node)) return true
		if (ts.isExportDeclaration(node)) return true

		return false
	}) as (ts.ImportDeclaration|ts.ExportDeclaration)[]

	let moduleSpecifiers: Map<string, string> = new Map()

	for (const node of nodes) {
		if (ts.isExportDeclaration(node)) {
			const result = convert(node)

			if (result.moduleSpecifier) {
				moduleSpecifiers.set(result.moduleSpecifier, "")
			}
		} else {
			moduleSpecifiers.set(convert(node).moduleSpecifier, "")
		}
	}

	return [
		...moduleSpecifiers.entries()
	].map(([key]) => {
		return key
	})
}
