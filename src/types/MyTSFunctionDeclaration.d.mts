export type TypeParameter = {
	name: string
	definition: string
}

export type Parameter = {
	name: string
	type: string
	initializer: string|undefined
	isOptional: boolean
}

export type MyTSFunctionDeclaration = {
	name: string|undefined
	parameters: Parameter[]
	typeParameters: TypeParameter[]
	modifiers: string[]
	returnType: string
	jsDoc: string
}
