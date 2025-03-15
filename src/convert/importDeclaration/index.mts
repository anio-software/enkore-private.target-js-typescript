import ts from "typescript"
import type {MyTSImportDeclaration} from "#~src/export/MyTSImportDeclaration.d.mts"

import {convertDefaultImport} from "./convertDefaultImport.mts"
import {convertStarImport} from "./convertStarImport.mts"
import {convertNamedImport} from "./convertNamedImport.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import {createMyTSNode} from "#~src/createMyTSNode.mts"

export function convertImportDeclaration(
	importNode: ts.ImportDeclaration
): MyTSImportDeclaration {
	const sourceFile = createMyTSSourceFile(importNode.getSourceFile())

	const defaultImport = convertDefaultImport(importNode)
	if (defaultImport) return createMyTSNode("ImportDeclaration", defaultImport, {sourceFile})

	const starImport = convertStarImport(importNode)
	if (starImport) return createMyTSNode("ImportDeclaration", starImport, {sourceFile})

	const namedImport = convertNamedImport(importNode)
	if (namedImport) return createMyTSNode("ImportDeclaration", namedImport, {sourceFile})

	throw new Error(
		`Unable to convert import declaration.`
	)
}
