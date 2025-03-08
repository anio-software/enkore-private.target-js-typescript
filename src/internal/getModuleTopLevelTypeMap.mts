import ts from "typescript"
import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"
import type {MyTSTopLevelType} from "#~src/export/MyTSTopLevelType.d.mts"

import {convertMyTSImportDeclarationToString} from "#~src/export/convertMyTSImportDeclarationToString.mts"
import {getModuleImportMap} from "./getModuleImportMap.mts"
import {filterNodes} from "./utils/filterNodes.mts"
import {convertTypeAliasDeclarationToString} from "@aniojs/node-ts-utils"
import {getTypeNamesReferencedInTSNode} from "./utils/getTypeNamesReferencedInTSNode.mts"

export function getModuleTopLevelTypeMap(
	myProgram: MyTSProgram,
	filePath: string
): Map<string, MyTSTopLevelType> {
	const topTypes: Map<string, MyTSTopLevelType> = new Map()
	const sourceFile = myProgram.getSourceFile(filePath)

	const importMap = getModuleImportMap(myProgram, filePath)

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

	const moduleTypeDeclarations = filterNodes(
		sourceFile, (node) => {
			return ts.isTypeAliasDeclaration(node)
		}
	) as ts.TypeAliasDeclaration[]

	for (const typeDeclaration of moduleTypeDeclarations) {
		// only handle top level type declarations
		if (typeDeclaration.parent !== sourceFile) continue

		const typeName = typeDeclaration.name.getText(sourceFile)

		const dependsOnTypes = getTypeNamesReferencedInTSNode(
			myProgram, typeDeclaration
		)
		//
		// handle the case where the type references itself
		//
		.filter(t => t !== typeName)

		topTypes.set(typeName, {
			name: typeName,
			declaration: convertTypeAliasDeclarationToString(
				typeDeclaration
			),
			source: "module",
			dependsOnTypes
		})
	}

	return topTypes
}
