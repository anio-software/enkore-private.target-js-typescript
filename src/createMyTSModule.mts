import type {
	MyTSProgram,
	Internal as MyTSProgramInternal
} from "./types/MyTSProgram.d.mts"
import type {MyTSModule} from "./types/MyTSModule.d.mts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.d.mts"
import {createMyTSSourceFile} from "./createMyTSSourceFile.mts"

export function createMyTSModule(
	myProgram: MyTSProgram,
	filePath: string
): MyTSModule {
	const progInternal = myProgram.__internal as MyTSProgramInternal

	const myModule: MyTSModule = {
		filePath,
		program: myProgram,
		moduleExports: new Map(),
		moduleImports: new Map(),
		source: {} as MyTSSourceFile
	};

	(myModule.source as any) = createMyTSSourceFile(
		progInternal.getTSSourceFile(filePath), myModule
	)

	return myModule
}
