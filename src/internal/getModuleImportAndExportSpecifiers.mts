import {
	getModuleImportAndExportSpecifiers as impl
} from "@aniojs/node-ts-utils"

import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"

export function getModuleImportAndExportSpecifiers(
	myProgram: MyTSProgram,
	filePath: string
) {
	return impl(myProgram.getSourceFile(filePath))
}
