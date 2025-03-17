import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.d.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"

import {
	astTransform,
	expandModuleImportAndExportDeclarations as expand
} from "@aniojs/node-ts-utils"

export function expandModuleImportAndExportDeclarations(): MyTSSourceFileTransformer {
	return (inputSourceFile) => {
		const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

		const transformed = astTransform(tsSourceFile, expand())

		return createMyTSSourceFile(transformed, undefined)
	}
}
