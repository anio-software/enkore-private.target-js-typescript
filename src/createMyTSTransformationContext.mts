import ts from "typescript"
import type {
	MyTSTransformationContext,
	Internal as MyTSTransformationContextInternal
} from "./types/MyTSTransformationContext.d.mts"

export function createMyTSTransformationContext(
	tsTransformationContext: ts.TransformationContext
): MyTSTransformationContext {
	const __internal: MyTSTransformationContextInternal = {
		tsTransformationContext
	}

	return {
		__internal
	}
}
