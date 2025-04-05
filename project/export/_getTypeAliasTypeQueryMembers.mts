import ts from "typescript"
import type {MyTSTypeAliasDeclaration} from "#~src/types/node/MyTSTypeAliasDeclaration.mts"
import {printNode} from "@aniojs/node-ts-utils"

type Member = {
	property: string
	expression: string
}

//
// this is only really here because of enkore
//
export function _getTypeAliasTypeQueryMembers(
	declaration: MyTSTypeAliasDeclaration
): Member[] {
	const tsNode = declaration._myTSNode.tsNode as ts.TypeAliasDeclaration
	const {type} = tsNode

	if (!ts.isTypeLiteralNode(type)) {
		return []
	}

	const ret: Member[] = []

	for (const member of type.members) {
		if (!ts.isPropertySignature(member)) continue
		if (!member.type || !member.name) continue
		if (!ts.isTypeQueryNode(member.type)) continue

		ret.push({
			property: printNode(member.name),
			expression: printNode(member.type.exprName)
		})
	}

	return ret
}
