import ts from "typescript"
import type {
	MyTSSourceFile,
	Internal as MyTSSourceFileInternal
} from "./types/MyTSSourceFile.d.mts"
import type {MyTSModule} from "./types/MyTSModule.d.mts"

export function createMyTSSourceFile(
	sourceFile: ts.SourceFile,
	associatedModule: MyTSModule|undefined = undefined
): MyTSSourceFile {
	const __internal: MyTSSourceFileInternal = {
		sourceFile,
		associatedModule
	}

	return {
		__internal
	}
}
