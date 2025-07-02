import type {MyTSTopLevelTypeDescriptor} from "../types/MyTSTopLevelTypeDescriptor.ts"
import {MyTSTopLevelTypeTreeClass} from "#~src/MyTSTopLevelTypeTreeClass.ts"
import {_getModuleTopLevelTypeMap} from "./_getModuleTopLevelTypeMap.ts"

type TypeMap = ReturnType<typeof _getModuleTopLevelTypeMap>

function buildTree(
	topLevelTypes: Map<string, MyTSTopLevelTypeDescriptor>,
	startType: string,
	rootNode: MyTSTopLevelTypeTreeClass
) {
	// todo: log warning
	if (!topLevelTypes.has(startType)) {
		return rootNode
	}

	const typeToAdd = topLevelTypes.get(startType)!
	const currentNode = rootNode ?? new MyTSTopLevelTypeTreeClass(typeToAdd)

	for (const type of typeToAdd.dependsOnTypes) {
		const node = new MyTSTopLevelTypeTreeClass(
			topLevelTypes.has(type) ? topLevelTypes.get(type)! : {
				declaration: `/* unable to find type '${type}' at the top level */`,
				dependsOnTypes: [],
				name: type,
				source: "module"
			}
		)

		currentNode.addChild(node)

		buildTree(topLevelTypes, type, node)
	}

	return currentNode
}

export function _getModuleTopLevelType(
	map: TypeMap
): MyTSTopLevelTypeTreeClass {
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
		new MyTSTopLevelTypeTreeClass(syntheticMainType)
	)
}
