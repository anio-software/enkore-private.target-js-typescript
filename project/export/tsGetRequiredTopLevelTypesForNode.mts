import ts from "typescript"

import type {Nodes} from "#~src/types/node/Map.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {MyTSTopLevelTypeTreeClass} from "#~src/MyTSTopLevelTypeTreeClass.mts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.mts"
import {getTypeNamesReferencedInNode} from "@anio-software/pkg.node-ts-utils"

export function tsGetRequiredTopLevelTypesForNode(
	node: Nodes
): MyTSTopLevelTypeTreeClass {
	const {associatedModule} = getMyTSSourceFileInternals(node._myTSNode.associatedSourceFile)

	if (!associatedModule) {
		throw new Error(
			`Cannot perform operation on a node that is not part of a module entity.`
		)
	}

	const {tsChecker} = getMyTSProgramInternals(associatedModule.program)

	const typeNamesReferenced = getTypeNamesReferencedInNode(
		tsChecker, node._myTSNode.tsNode as ts.Node
	)

	const topNode = new MyTSTopLevelTypeTreeClass({
		declaration: "",
		dependsOnTypes: typeNamesReferenced,
		name: "node()",
		source: "module"
	})

	for (const typeName of typeNamesReferenced) {
		const node = associatedModule.topLevelTypesTree.findChild((node) => {
			return node.name === typeName
		})

		if (!node) continue

		topNode.addChild(node)
	}

	return topNode
}
