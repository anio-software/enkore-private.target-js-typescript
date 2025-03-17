import type {MyTSSourceFile} from "./MyTSSourceFile.d.mts"
import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.d.mts"

export function transformSourceFile(
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
