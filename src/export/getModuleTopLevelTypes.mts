import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSTopLevelType} from "#~src/export/MyTSTopLevelType.d.mts"
import {MyTSTopLevelTypeNode} from "#~src/internal/MyTSTopLevelTypeNode.mts"
import {getModuleTopLevelTypeMap} from "./getModuleTopLevelTypeMap.mts"

function buildTree(
	topLevelTypes: Map<string, MyTSTopLevelType>,
	startType: string,
	rootNode: MyTSTopLevelTypeNode
) {
	const typeToAdd = topLevelTypes.get(startType)!
	const currentNode = rootNode ?? new MyTSTopLevelTypeNode(typeToAdd)

	for (const type of typeToAdd.dependsOnTypes) {
		const node = new MyTSTopLevelTypeNode(
			topLevelTypes.get(type)!
		)

		currentNode.addChild(node)

		buildTree(topLevelTypes, type, node)
	}

	return currentNode
}

export function getModuleTopLevelTypes(
	myProgram: MyTSProgram,
	filePath: string
): MyTSTopLevelTypeNode {
	const map = getModuleTopLevelTypeMap(myProgram, filePath)
	// safe to use here because a type name cannot have parentheses 
	const syntheticMainTypeName = "main()"

	const syntheticMainType: MyTSTopLevelType = {
		declaration: "",
		// main type depends on **all** defined types
		dependsOnTypes: [
			...map.entries()
		].map(([key]) => key),
		name: syntheticMainTypeName,
		source: "module"
	}

	map.set(syntheticMainTypeName, syntheticMainType)

	return buildTree(
		map,
		syntheticMainTypeName,
		new MyTSTopLevelTypeNode(syntheticMainType)
	)
}
