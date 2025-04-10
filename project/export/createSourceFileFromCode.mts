import ts from "typescript"

import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.mts"
import {randomIdentifierSync} from "@aniojs/random-ident"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"

type Options = {
	filePath?: string|undefined
}

export function createSourceFileFromCode(
	code: string, options?: Options
): MyTSSourceFile {
	const filePath = options?.filePath ?? `/synthetic_${randomIdentifierSync(16)}.mts`

	console.log(filePath)

	const tsSourceFile = ts.createSourceFile(
		filePath,
		code,
		ts.ScriptTarget.ESNext,
		true,
		ts.ScriptKind.TS
	)

	return createMyTSSourceFile(tsSourceFile, undefined)
}
