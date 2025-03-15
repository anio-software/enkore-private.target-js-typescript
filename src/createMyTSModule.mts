import type {MyTSProgram} from "./types/MyTSProgram.d.mts"
import type {MyTSModule} from "./types/MyTSModule.d.mts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.d.mts"
import {createMyTSSourceFile} from "./createMyTSSourceFile.mts"
import {getMyTSProgramInternals} from "./getMyTSProgramInternals.mts"

export function createMyTSModule(
	myProgram: MyTSProgram,
	filePath: string
): MyTSModule {
	const myModule: MyTSModule = {
		filePath,
		program: myProgram,
		moduleExports: new Map(),
		moduleImports: new Map(),
		source: {} as MyTSSourceFile
	};

	(myModule.source as any) = createMyTSSourceFile(
		getMyTSProgramInternals(myProgram).getTSSourceFile(filePath), myModule
	)

	return myModule
}
