import type {MyTSTopLevelTypeDescriptor} from "../types/MyTSTopLevelTypeDescriptor.d.mts"
import {MyTSTopLevelTypeTree} from "#~src/export/MyTSTopLevelTypeTree.mts"
import {_getModuleTopLevelTypeMap} from "./_getModuleTopLevelTypeMap.mts"

type TypeMap = ReturnType<typeof _getModuleTopLevelTypeMap>

function buildTree(
	topLevelTypes: Map<string, MyTSTopLevelTypeDescriptor>,
	startType: string,
	rootNode: MyTSTopLevelTypeTree
) {
	// todo: log warning
	if (!topLevelTypes.has(startType)) {
		return rootNode
	}

	const typeToAdd = topLevelTypes.get(startType)!
	const currentNode = rootNode ?? new MyTSTopLevelTypeTree(typeToAdd)

	for (const type of typeToAdd.dependsOnTypes) {
		// todo: log warning
		if (!topLevelTypes.has(type)) continue

		const node = new MyTSTopLevelTypeTree(
			topLevelTypes.get(type)!
		)

		currentNode.addChild(node)

		buildTree(topLevelTypes, type, node)
	}

	return currentNode
}

export function _getModuleTopLevelType(
	map: TypeMap
): MyTSTopLevelTypeTree {
	// safe to use here because a type name cannot have parentheses 
	const syntheticMainTypeName = "main()"

	const syntheticMainType: MyTSTopLevelTypeDescriptor = {
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
		new MyTSTopLevelTypeTree(syntheticMainType)
	)
}
