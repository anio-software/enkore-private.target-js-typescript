import ts from "typescript"
import type {MyTSTypeAliasDeclaration} from "#~src/types/node/MyTSTypeAliasDeclaration.mts"
import {printNode} from "@anio-software/pkg.node-ts-utils"

type Member = {
	property: string
	expression: string
	origin: string|undefined
}

//
// this is only really here because of enkore
//
export function _tsGetTypeAliasTypeQueryMembers(
	declaration: MyTSTypeAliasDeclaration
): Member[] {
	const tsNode = declaration._myTSNode.tsNode as ts.TypeAliasDeclaration
	const {type} = tsNode

	if (!ts.isTypeLiteralNode(type)) {
		return []
	}

	const ret: Member[] = []
	const origin: string|undefined = (() => {
		const srcFile = type.getSourceFile()

		if (ts.isSourceFile(srcFile)) {
			return srcFile.fileName
		}

		return undefined
	})()

	for (const member of type.members) {
		if (!ts.isPropertySignature(member)) continue
		if (!member.type || !member.name) continue
		if (!ts.isTypeQueryNode(member.type)) continue

		ret.push({
			property: printNode(member.name),
			expression: printNode(member.type.exprName),
			origin
		})
	}

	return ret
}
