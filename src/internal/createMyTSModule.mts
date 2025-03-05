import type {MyTSModule} from "#~src/export/MyTSModule.d.mts"
import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"

import {getModuleExports} from "./getModuleExports.mts"
import {getModuleTopLevelTypes} from "./getModuleTopLevelTypes.mts"
import {getModuleImportMap} from "./getModuleImportMap.mts"

export function createMyTSModule(
	myProgram: MyTSProgram,
	filePath: string
): MyTSModule {
	const moduleImports = getModuleImportMap(myProgram, filePath)
	const moduleExports = getModuleExports(myProgram, filePath)
	const rootTopLevelTypeNode = getModuleTopLevelTypes(myProgram, filePath)

	return {
		filePath,
		program: myProgram,
		moduleImports,
		moduleExports,
		rootTopLevelTypeNode
	}
}
