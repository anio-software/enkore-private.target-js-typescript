import ts from "typescript"
import fs from "node:fs"

import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"

export function createSourceFile(
	filePath: string
): MyTSSourceFile {
	const tsSourceFile = ts.createSourceFile(
		filePath,
		fs.readFileSync(filePath).toString(),
		ts.ScriptTarget.ESNext,
		true,
		ts.ScriptKind.TS
	)

	return createMyTSSourceFile(tsSourceFile, undefined)
}
