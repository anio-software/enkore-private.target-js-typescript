import type {MyTSModule} from "./MyTSModule.d.mts"
import type {MyTSSourceFile} from "./MyTSSourceFile.d.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"

import {
	astTransform,
	expandModuleImportAndExportDeclarations as expand
} from "@aniojs/node-ts-utils"

export function expandModuleImportAndExportDeclarations(
	src: MyTSModule|MyTSSourceFile
): MyTSSourceFile {
	const inputSourceFile = "source" in src ? src.source : src
	const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

	const transformed = astTransform(tsSourceFile, expand())

	return createMyTSSourceFile(transformed, undefined)
}
