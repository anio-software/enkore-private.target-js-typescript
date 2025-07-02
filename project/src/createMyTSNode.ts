import type {Kinds, TSNodeTypeMap} from "./types/node/Kinds.ts"
import type {Map} from "./types/node/Map.ts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.ts"
import type {_MyTSNode} from "./types/node/DefineNodeType.ts"

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
