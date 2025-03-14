import ts from "typescript"

// opaque representation of a typescript source file
export type Internal = {
	sourceFile: ts.SourceFile
}

export type MyTSSourceFile = {
	readonly __internal: unknown
}
