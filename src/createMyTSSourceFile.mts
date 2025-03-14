import ts from "typescript"
import type {
	MyTSSourceFile,
	Internal as MyTSSourceFileInternal
} from "./types/MyTSSourceFile.d.mts"

export function createMyTSSourceFile(
	sourceFile: ts.SourceFile
): MyTSSourceFile {
	const __internal: MyTSSourceFileInternal = {
		sourceFile
	}

	return {
		__internal
	}
}
