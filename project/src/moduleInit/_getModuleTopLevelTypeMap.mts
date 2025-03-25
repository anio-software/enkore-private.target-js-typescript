import ts from "typescript"
import type {MyTSModule} from "../types/MyTSModule.mts"
import type {MyTSTopLevelTypeDescriptor} from "../types/MyTSTopLevelTypeDescriptor.mts"
import {convertMyTSImportDeclarationToString} from "#~export/convertMyTSImportDeclarationToString.mts"

import {
	astFilter,
	getTypeAliasDeclarationAsFormattedString
} from "@aniojs/node-ts-utils"
import {getTypeNamesReferencedInNode} from "@aniojs/node-ts-utils"

export function _getModuleTopLevelTypeMap(
	sourceFile: ts.SourceFile,
	tsChecker: ts.TypeChecker,
	importMap: MyTSModule["moduleImports"]
): Map<string, MyTSTopLevelTypeDescriptor> {
	const topTypes: Map<string, MyTSTopLevelTypeDescriptor> = new Map()

	for (const [key, value] of importMap.entries()) {
		const declaration = convertMyTSImportDeclarationToString(value)
		const typeName = value.isTypeOnly ? key : `typeof:${key}`

		// we know this map is flattened so it
		// is safe to assume every named import in this list
		// only contains one member
		topTypes.set(typeName, {
			name: typeName,
			declaration,
			source: "import",
			dependsOnTypes: []
		})
	}

	//
	// get all other top level types like "Promise", "Awaited" etc.
	//
	for (const symbol of tsChecker.getSymbolsInScope(sourceFile, ts.SymbolFlags.Type)) {
		if (topTypes.has(symbol.name)) continue

		topTypes.set(symbol.name, {
			name: symbol.name,
			declaration: `/* type '${symbol.name}' is in global scope */`,
			source: "module",
			dependsOnTypes: []
		})
	}

	const moduleTypeDeclarations = astFilter(
		sourceFile, (node) => {
			return ts.isTypeAliasDeclaration(node)
		}
	)

	for (const typeDeclaration of moduleTypeDeclarations) {
		// only handle top level type declarations
		if (typeDeclaration.parent !== sourceFile) continue

		const typeName = typeDeclaration.name.getText(sourceFile)

		const dependsOnTypes = getTypeNamesReferencedInNode(
			tsChecker, typeDeclaration
		)
		//
		// handle the case where the type references itself
		//
		.filter(t => t !== typeName)

		topTypes.set(typeName, {
			name: typeName,
			declaration: getTypeAliasDeclarationAsFormattedString(
				typeDeclaration, {
					dropExportKeyword: true
				}
			),
			source: "module",
			dependsOnTypes
		})
	}

	return topTypes
}
