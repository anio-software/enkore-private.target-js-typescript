import ts from "typescript"

export type Internal = {
	tsTransformationContext: ts.TransformationContext
}

// opaque representation of a typescript transformation context
export type MyTSTransformationContext = {
	_myTSTransformationContextBrand: any

	readonly __internal: unknown
}
