import ts from "typescript"

export type Internal = {
	tsCompilerOptions: ts.CompilerOptions
}

// opaque representation of the typescript compiler options
export type MyTSCompilerOptions = {
	_myTSCompilerOptionsBrand: any

	readonly __internal: unknown
}
