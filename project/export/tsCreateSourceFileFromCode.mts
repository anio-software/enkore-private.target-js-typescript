import ts from "typescript"
import {isBoolean, isString} from "@anio-software/pkg.is"

import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.mts"
import {randomIdentifierSync} from "@aniojs/random-ident"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"

type Options = {
	filePath?: string|undefined
	isTSX?: boolean
}

export function tsCreateSourceFileFromCode(
	code: string, options?: Options
): MyTSSourceFile {
	const isTSX: boolean = (() => {
		if (isBoolean(options?.isTSX)) {
			return options.isTSX
		} else if (isString(options?.filePath)) {
			return options.filePath.endsWith(".tsx")
		}

		// todo: emit warning
		return false
	})()

	const expectedFileExtension = isTSX ? ".tsx" : ".ts"
	const filePath = options?.filePath ?? `/synthetic_${randomIdentifierSync(16)}${expectedFileExtension}`

	if (!filePath.endsWith(expectedFileExtension)) {
		throw new Error(
			`isTSX '${isTSX}' and file extension ('${filePath}') don't match up.`
		)
	}

	const tsSourceFile = ts.createSourceFile(
		filePath,
		code,
		ts.ScriptTarget.ESNext,
		true,
		isTSX ? ts.ScriptKind.TSX : ts.ScriptKind.TS
	)

	return createMyTSSourceFile(tsSourceFile, undefined)
}
