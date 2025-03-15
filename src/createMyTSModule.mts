import type {MyTSProgram} from "./types/MyTSProgram.d.mts"
import type {MyTSModule} from "./types/MyTSModule.d.mts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.d.mts"
import {createMyTSSourceFile} from "./createMyTSSourceFile.mts"
import {getMyTSProgramInternals} from "./getMyTSProgramInternals.mts"
import {_getModuleExports} from "./moduleInit/_getModuleExports.mts"
import {_getModuleImportMap} from "./moduleInit/_getModuleImportMap.mts"

export function createMyTSModule(
	myProgram: MyTSProgram,
	filePath: string
): MyTSModule {
	const myProgramInt = getMyTSProgramInternals(myProgram)
	const tsSourceFile = myProgramInt.getTSSourceFile(filePath)

	const myModule: MyTSModule = {
		filePath,
		program: myProgram,
		moduleExports: new Map(),
		moduleImports: new Map(),
		source: {} as MyTSSourceFile
	}

	;(myModule.source as any) = createMyTSSourceFile(
		tsSourceFile, myModule
	);

	;(myModule.moduleExports as any) = _getModuleExports(
		tsSourceFile, myProgramInt.tsChecker, myModule.source
	);

	;(myModule.moduleImports as any) = _getModuleImportMap(
		tsSourceFile, myModule.source
	);

	return myModule
}
