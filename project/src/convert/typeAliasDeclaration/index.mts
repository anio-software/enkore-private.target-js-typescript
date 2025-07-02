import ts from "typescript"

import type {MyTSTypeAliasDeclaration} from "#~src/types/node/MyTSTypeAliasDeclaration.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import {createMyTSNode} from "#~src/createMyTSNode.mts"
import {printNode} from "@anio-software/pkg.node-ts-utils"

export function convertTypeAliasDeclaration(
	node: ts.TypeAliasDeclaration
): MyTSTypeAliasDeclaration {
	const sourceFile = createMyTSSourceFile(node.getSourceFile())

	return createMyTSNode("TypeAliasDeclaration", {
		name: printNode(node.name),
		jsDoc: ""
	}, {tsNode: node, sourceFile})
}
