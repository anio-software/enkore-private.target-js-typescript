import type {DefineNodeType} from "./DefineNodeType.d.mts"

export type MyTSVariableDeclaration = DefineNodeType<
	"VariableDeclaration", {
		identifier: string
		initializer: string|undefined
		jsDoc: string
	}
>
