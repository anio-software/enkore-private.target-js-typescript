import type {DefineNodeType} from "./DefineNodeType.mts"

export type MyTSVariableDeclaration = DefineNodeType<
	"VariableDeclaration", {
		identifier: string
		initializer: string|undefined
		jsDoc: string
	}
>
