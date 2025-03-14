import ts from "typescript"

import type {
	MyTSSourceFile,
	Internal as MyTSSourceFileInternal
} from "#~src/types/MyTSSourceFile.d.mts"

export function getTSSourceFile(
	source: MyTSSourceFile
): ts.SourceFile {
	const sourceInternal = source.__internal as MyTSSourceFileInternal

	return sourceInternal.sourceFile
}
