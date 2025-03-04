import ts from "typescript"
import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSTopLevelType} from "./MyTSTopLevelType.d.mts"

import {convertMyTSImportDeclarationToString} from "./convertMyTSImportDeclarationToString.mts"
import {getModuleImportMap} from "./getModuleImportMap.mts"
import {filterNodes} from "#~src/internal/utils/filterNodes.mts"
import {convertTSTypeAliasDeclarationToString} from "#~src/internal/utils/convertTSTypeAliasDeclarationToString.mts"
import {getTypeNamesReferencedInTSNode} from "#~src/internal/utils/getTypeNamesReferencedInTSNode.mts"

export function getModuleTopLevelTypes(
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
			name: key,
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
			declaration: convertTSTypeAliasDeclarationToString(
				typeDeclaration
			),
			source: "module",
			dependsOnTypes
		})
	}

	return topTypes
}
