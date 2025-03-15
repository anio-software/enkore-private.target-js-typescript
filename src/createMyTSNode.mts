import type {Kinds} from "./types/node/Kinds.d.mts"
import type {Map} from "./types/node/Map.d.mts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.d.mts"

export function createMyTSNode<
	Kind extends Kinds
>(
	kind: Kind,
	data: Omit<Map[Kind], "_myTSNode">,
	meta: {
		sourceFile: MyTSSourceFile
	}
): Map[Kind] {
	return {
		_myTSNode: {
			kind,
			associatedSourceFile: meta.sourceFile
		},
		...data
	} as Map[Kind]
}
