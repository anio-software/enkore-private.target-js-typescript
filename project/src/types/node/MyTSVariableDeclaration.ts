import type {DefineNodeType} from "./DefineNodeType.ts"

export type MyTSVariableDeclaration = DefineNodeType<
	"VariableDeclaration", {
		identifier: string
		initializer: string|undefined
		jsDoc: string
	}
>
