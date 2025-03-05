import type {MyTSModule} from "./MyTSModule.d.mts"
import {getModuleImportAndExportSpecifiers as impl} from "#~src/internal/getModuleImportAndExportSpecifiers.mts"

export function getModuleImportAndExportSpecifiers(
	mod: MyTSModule
): string[] {
	return impl(
		mod.program, mod.filePath
	)
}
