import type {DefineNodeType} from "./DefineNodeType.mts"

export type MyTSTypeAliasDeclaration = DefineNodeType<
	"TypeAliasDeclaration", {
		name: string
		jsDoc: string
		// todo: add declaration or something
	}
>
