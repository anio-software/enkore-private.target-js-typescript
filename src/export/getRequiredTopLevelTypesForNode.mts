import type {Nodes} from "#~src/types/node/Map.d.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import type {MyTSTopLevelType} from "./MyTSTopLevelType.d.mts"

export function getRequiredTopLevelTypesForNode(
	node: Nodes
): MyTSTopLevelType {
	const {associatedModule} = getMyTSSourceFileInternals(node._myTSNode.associatedSourceFile)

	if (!associatedModule) {
		throw new Error(
			`Cannot perform operation on a node that is not part of a module entity.`
		)
	}

	return {} as MyTSTopLevelType
}
