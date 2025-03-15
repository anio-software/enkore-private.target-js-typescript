import ts from "typescript"

import type {MyTSVariableDeclaration} from "#~src/types/node/MyTSVariableDeclaration.d.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import {createMyTSNode} from "#~src/createMyTSNode.mts"
import {printNode} from "@aniojs/node-ts-utils"

export function convertVariableDeclaration(
	node: ts.VariableDeclaration
): MyTSVariableDeclaration {
	const sourceFile = createMyTSSourceFile(node.getSourceFile())

	return createMyTSNode("VariableDeclaration", {
		identifier: printNode(node.name),
		initializer: node.initializer ? printNode(node.initializer) : "",
		jsDoc: ""
	}, {sourceFile})
}
