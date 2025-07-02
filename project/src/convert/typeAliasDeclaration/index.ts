import ts from "typescript"

import type {MyTSTypeAliasDeclaration} from "#~src/types/node/MyTSTypeAliasDeclaration.ts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.ts"
import {createMyTSNode} from "#~src/createMyTSNode.ts"
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
