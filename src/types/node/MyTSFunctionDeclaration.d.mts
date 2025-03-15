import type {DefineNodeType} from "./DefineNodeType.d.mts"

export type TypeParameter = {
	name: string
	// todo: maybe add "expression", "constraint" and "default" fields
	definition: string
}

export type Parameter = {
	name: string
	type: string
	initializer: string|undefined
	isOptional: boolean
}

export type MyTSFunctionDeclaration = DefineNodeType<
	"FunctionDeclaration", {
		name: string|undefined
		parameters: Parameter[]
		typeParameters: TypeParameter[]
		modifiers: string[]
		returnType: string
		jsDoc: string
	}
>
