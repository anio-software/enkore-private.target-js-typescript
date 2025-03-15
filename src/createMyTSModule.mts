import type {
	MyTSProgram,
	Internal as MyTSProgramInternal
} from "./types/MyTSProgram.d.mts"
import type {MyTSModule} from "./types/MyTSModule.d.mts"
import {createMyTSSourceFile} from "./createMyTSSourceFile.mts"

export function createMyTSModule(
	myProgram: MyTSProgram,
	filePath: string
): MyTSModule {
	const progInternal = myProgram.__internal as MyTSProgramInternal

	return {
		filePath,
		program: myProgram,
		source: createMyTSSourceFile(progInternal.getTSSourceFile(filePath)),
		moduleExports: new Map(),
		moduleImports: new Map()
	}
}
