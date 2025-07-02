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

	// todo: use enkore runtime to do the logging
	if (typeof sourceFile === "undefined") {
		console.warn(`createMyTSSourceFile: sourceFile is undefined`)
	}

	return {
		_myTSSourceFileBrand: undefined,
		code: sourceFile.getFullText(),
		__internal
	}
}
