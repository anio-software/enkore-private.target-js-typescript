import ts from "typescript"
import type {
	MyTSTransformationContext,
	Internal as MyTSTransformationContextInternal
} from "./types/MyTSTransformationContext.mts"

export function createMyTSTransformationContext(
	tsTransformationContext: ts.TransformationContext
): MyTSTransformationContext {
	const __internal: MyTSTransformationContextInternal = {
		tsTransformationContext
	}

	return {
		_myTSTransformationContextBrand: undefined,
		__internal
	}
}
