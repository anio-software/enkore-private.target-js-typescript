import ts from "typescript"

import type {MyTSTypeAliasDeclaration} from "#~src/types/node/MyTSTypeAliasDeclaration.d.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import {createMyTSNode} from "#~src/createMyTSNode.mts"
import {printNode} from "@aniojs/node-ts-utils"

export function convertTypeAliasDeclaration(
	node: ts.TypeAliasDeclaration
): MyTSTypeAliasDeclaration {
	const sourceFile = createMyTSSourceFile(node.getSourceFile())

	return createMyTSNode("TypeAliasDeclaration", {
		name: printNode(node.type),
		jsDoc: ""
	}, {sourceFile})
}
