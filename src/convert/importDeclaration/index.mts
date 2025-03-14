import ts from "typescript"
import type {MyTSImportDeclaration} from "#~src/export/MyTSImportDeclaration.d.mts"

import {convertDefaultImport} from "./convertDefaultImport.mts"
import {convertStarImport} from "./convertStarImport.mts"
import {convertNamedImport} from "./convertNamedImport.mts"

export function convertImportDeclaration(
	importNode: ts.ImportDeclaration
): MyTSImportDeclaration {
	const defaultImport = convertDefaultImport(importNode)
	if (defaultImport) return defaultImport

	const starImport = convertStarImport(importNode)
	if (starImport) return starImport

	const namedImport = convertNamedImport(importNode)
	if (namedImport) return namedImport

	throw new Error(
		`Unable to convert import declaration.`
	)
}
