import type {
	MyTSTransformationContext,
	Internal as MyTSTransformationContextInternal
} from "./types/MyTSTransformationContext.mts"

export function getMyTSTransformationContextInternals(
	myContext: MyTSTransformationContext
): MyTSTransformationContextInternal {
	return myContext.__internal as MyTSTransformationContextInternal
}
