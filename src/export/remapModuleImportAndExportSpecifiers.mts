import ts from "typescript"
import type {MyTSModule} from "./MyTSModule.d.mts"
import {
	remapModuleImportAndExportSpecifiers as impl,
	type Mapper
} from "#~src/internal/remapModuleImportAndExportSpecifiers.mts"

export function remapModuleImportAndExportSpecifiers(
	mod: MyTSModule,
	mapper: Mapper
): ts.Node {
	return impl(
		mod.program, mod.filePath, mapper
	)
}
