import type {Kinds, TSNodeTypeMap} from "./types/node/Kinds.mts"
import type {Map} from "./types/node/Map.mts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.mts"
import type {_MyTSNode} from "./types/node/DefineNodeType.mts"

export function createMyTSNode<
	Kind extends Kinds
>(
	kind: Kind,
	data: Map[Kind],
	meta: {
		tsNode: TSNodeTypeMap[Kind]
		sourceFile: MyTSSourceFile
	}
): Map[Kind] & {_myTSNode: _MyTSNode<Kind>} {
	return {
		...data,
		_myTSNode: {
			kind,
			tsNode: meta.tsNode,
			associatedSourceFile: meta.sourceFile
		}
	}
}
