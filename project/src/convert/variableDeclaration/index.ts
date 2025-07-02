import ts from "typescript"

import type {MyTSVariableDeclaration} from "#~src/types/node/MyTSVariableDeclaration.ts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.ts"
import {createMyTSNode} from "#~src/createMyTSNode.ts"
import {printNode} from "@anio-software/pkg.node-ts-utils"

export function convertVariableDeclaration(
	node: ts.VariableDeclaration
): MyTSVariableDeclaration {
	const sourceFile = createMyTSSourceFile(node.getSourceFile())

	return createMyTSNode("VariableDeclaration", {
		identifier: printNode(node.name),
		initializer: node.initializer ? printNode(node.initializer) : "",
		jsDoc: ""
	}, {tsNode: node, sourceFile})
}
