import ts from "typescript"
import type {MyTSImportDeclaration} from "#~export/MyTSImportDeclaration.ts"

import {convertAnonymousImport} from "./convertAnonymousImport.ts"
import {convertDefaultImport} from "./convertDefaultImport.ts"
import {convertStarImport} from "./convertStarImport.ts"
import {convertNamedImport} from "./convertNamedImport.ts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.ts"
import {createMyTSNode} from "#~src/createMyTSNode.ts"

export function convertImportDeclaration(
	importNode: ts.ImportDeclaration
): MyTSImportDeclaration {
	const sourceFile = createMyTSSourceFile(importNode.getSourceFile())
	const meta = {tsNode: importNode, sourceFile}

	const anonymousImport = convertAnonymousImport(importNode)
	if (anonymousImport) return createMyTSNode("ImportDeclaration", anonymousImport, meta)

	const defaultImport = convertDefaultImport(importNode)
	if (defaultImport) return createMyTSNode("ImportDeclaration", defaultImport, meta)

	const starImport = convertStarImport(importNode)
	if (starImport) return createMyTSNode("ImportDeclaration", starImport, meta)

	const namedImport = convertNamedImport(importNode)
	if (namedImport) return createMyTSNode("ImportDeclaration", namedImport, meta)

	throw new Error(
		`Unable to convert import declaration.`
	)
}
