import ts from "typescript"
import {createMyTSSourceFile} from "../createMyTSSourceFile.ts"
import {getMyTSSourceFileInternals} from "../getMyTSSourceFileInternals.ts"
import type {MyTSSourceFileTransformer} from "../types/MyTSSourceFileTransformer.ts"

function transformSingle(
	tsSourceFile: ts.SourceFile,
	transform: MyTSSourceFileTransformer
): ts.SourceFile {
	const wrapped = createMyTSSourceFile(tsSourceFile, undefined)

	return getMyTSSourceFileInternals(
		transform(wrapped)
	).tsSourceFile
}

export function _transformTSSourceFile(
	tsSourceFile: ts.SourceFile,
	transform: MyTSSourceFileTransformer|MyTSSourceFileTransformer[]
): ts.SourceFile {
	const transformer = Array.isArray(transform) ? transform : [transform]
	let transformed = tsSourceFile

	for (const transform of transformer) {
		transformed = transformSingle(transformed, transform)
	}

	return transformed
}
