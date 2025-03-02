export type TypeParameter = {
	name: string
	definition: string
}

export type Parameter = {
	name: string
	type: string
	jsDoc: string
	definition: string
	isOptional: boolean
}

export type MyTSFunctionDeclaration = {
	_myDeclarationType: "FunctionDeclaration"
	_myDeclarationTSNode: unknown

	name: string|undefined
	modifiers: string[]
	parameters: Parameter[]
	typeParameters: TypeParameter[]
	returnType: string
	jsDoc: string
}
