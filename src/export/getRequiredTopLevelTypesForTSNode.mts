import ts from "typescript"
import type {MyTSModule} from "./MyTSModule.d.mts"
import {MyTSTopLevelTypeNode} from "#~src/internal/MyTSTopLevelTypeNode.mts"
import {getTypeNamesReferencedInTSNode} from "#~src/internal/utils/getTypeNamesReferencedInTSNode.mts"

function findTopLevelTypeNodeByName(
	rootNode: MyTSTopLevelTypeNode,
	typeName: string
): MyTSTopLevelTypeNode|undefined {
	let result: MyTSTopLevelTypeNode|undefined = undefined

	rootNode.depthFirstTraversal((node) => {
		if (node.getType().name === typeName) {
			result = node

			// stop the traversal here
			return false
		}
	})

	return result
}

export function getRequiredTopLevelTypesForTSNode(
	mod: MyTSModule,
	node: ts.Node
): MyTSTopLevelTypeNode {
	const typeNamesReferenced = getTypeNamesReferencedInTSNode(
		mod.program, node
	)

	const topNode = new MyTSTopLevelTypeNode({
		declaration: "",
		dependsOnTypes: typeNamesReferenced,
		name: "node()",
		source: "module"
	})

	for (const typeName of typeNamesReferenced) {
		const node = findTopLevelTypeNodeByName(
			mod.rootTopLevelTypeNode,
			typeName
		)

		if (!node) continue

		topNode.addChild(node)
	}

	return topNode
}
