import type {Kinds} from "./Kinds.d.mts"
import type {MyTSSourceFile} from "../MyTSSourceFile.d.mts"

export type _MyTSNode<Kind extends Kinds> = {
	readonly kind: Kind
	readonly associatedSourceFile: MyTSSourceFile
	readonly tsNode: unknown
}

export type DefineNodeType<
	Kind extends Kinds,
	Node extends object
> = {
	readonly _myTSNode: _MyTSNode<Kind>
} & Node
