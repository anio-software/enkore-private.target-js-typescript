import ts from "typescript"
import type {
	MyTSSourceFile,
	Internal as MyTSSourceFileInternal
} from "./types/MyTSSourceFile.mts"
import type {MyTSModule} from "./types/MyTSModule.mts"

export function createMyTSSourceFile(
	sourceFile: ts.SourceFile,
	associatedModule: MyTSModule|undefined = undefined
): MyTSSourceFile {
	const __internal: MyTSSourceFileInternal = {
		tsSourceFile: sourceFile,
		associatedModule
	}

	return {
		_myTSSourceFileBrand: undefined,
		__internal
	}
}
