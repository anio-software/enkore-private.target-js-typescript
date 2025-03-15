import type {DefineNodeType} from "./DefineNodeType.d.mts"

export type MyTSTypeAliasDeclaration = DefineNodeType<
	"TypeAliasDeclaration", {
		name: string
		// todo: add declaration or something
	}
>
