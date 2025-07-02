import type {Kinds} from "./Kinds.ts"
import type {MyTSSourceFile} from "../MyTSSourceFile.ts"

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
