import type {MyTSTopLevelTypeDescriptor} from "../types/MyTSTopLevelTypeDescriptor.d.mts"
import {MyTSTopLevelType} from "#~src/export/MyTSTopLevelType.mts"
import {_getModuleTopLevelTypeMap} from "./_getModuleTopLevelTypeMap.mts"

type TypeMap = ReturnType<typeof _getModuleTopLevelTypeMap>

function buildTree(
	topLevelTypes: Map<string, MyTSTopLevelTypeDescriptor>,
	startType: string,
	rootNode: MyTSTopLevelType
) {
	// todo: log warning
	if (!topLevelTypes.has(startType)) {
		return rootNode
	}

	const typeToAdd = topLevelTypes.get(startType)!
	const currentNode = rootNode ?? new MyTSTopLevelType(typeToAdd)

	for (const type of typeToAdd.dependsOnTypes) {
		// todo: log warning
		if (!topLevelTypes.has(type)) continue

		const node = new MyTSTopLevelType(
			topLevelTypes.get(type)!
		)

		currentNode.addChild(node)

		buildTree(topLevelTypes, type, node)
	}

	return currentNode
}

export function _getModuleTopLevelType(
	map: TypeMap
): MyTSTopLevelType {
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
		new MyTSTopLevelType(syntheticMainType)
	)
}
