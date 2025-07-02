import type {MyTSModule} from "./MyTSModule.mts"
import type {MyTSSourceFile} from "./MyTSSourceFile.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"

import {
	getModuleImportAndExportSpecifiers as impl
} from "@anio-software/pkg.node-ts-utils"

export function tsGetModuleImportAndExportSpecifiers(
	src: MyTSModule|MyTSSourceFile
): string[] {
	const inputSourceFile = "source" in src ? src.source : src
	const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

	return impl(tsSourceFile)
}
