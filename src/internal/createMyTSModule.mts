import type {MyTSModule} from "#~src/export/MyTSModule.d.mts"
import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"

import {getModuleExports} from "#~src/export/getModuleExports.mts"
import {getModuleTopLevelTypes} from "./getModuleTopLevelTypes.mts"

export function createMyTSModule(
	myProgram: MyTSProgram,
	filePath: string
): MyTSModule {
	const moduleExports = getModuleExports(myProgram, filePath)
	const rootTopLevelTypeNode = getModuleTopLevelTypes(myProgram, filePath)

	return {
		filePath,
		program: myProgram,
		moduleExports,
		rootTopLevelTypeNode
	}
}
