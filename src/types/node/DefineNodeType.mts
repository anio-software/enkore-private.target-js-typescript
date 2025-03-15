import type {Kinds} from "./Kinds.d.mts"
import type {MyTSSourceFile} from "../MyTSSourceFile.d.mts"

export type DefineNodeType<
	Kind extends Kinds,
	Node extends object
> = {
	readonly _myTSNode: {
		readonly kind: Kind
		readonly associatedSourceFile: MyTSSourceFile
		readonly tsNode: unknown
	}
} & Node
