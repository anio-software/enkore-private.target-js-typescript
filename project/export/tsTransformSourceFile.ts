import type {MyTSSourceFile} from "./MyTSSourceFile.ts"
import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.ts"

export function tsTransformSourceFile(
	src: MyTSSourceFile,
	transform: MyTSSourceFileTransformer|MyTSSourceFileTransformer[]
): MyTSSourceFile {
	const transformer = Array.isArray(transform) ? transform : [transform]
	let transformed = src

	for (const transform of transformer) {
		transformed = transform(transformed)
	}

	return transformed
}
