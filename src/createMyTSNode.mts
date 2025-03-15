import type {Kinds, TSNodeTypeMap} from "./types/node/Kinds.d.mts"
import type {Map} from "./types/node/Map.d.mts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.d.mts"

export function createMyTSNode<
	Kind extends Kinds
>(
	kind: Kind,
	data: Omit<Map[Kind], "_myTSNode">,
	meta: {
		tsNode: TSNodeTypeMap[Kind]
		sourceFile: MyTSSourceFile
	}
): Map[Kind] {
	return {
		...data,
		_myTSNode: {
			kind,
			tsNode: meta.tsNode,
			associatedSourceFile: meta.sourceFile
		}
	} as Map[Kind]
}
