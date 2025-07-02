import ts from "typescript"

import type {
	MyTSFunctionDeclaration,
	Parameter,
	TypeParameter
} from "#~src/types/node/MyTSFunctionDeclaration.ts"

import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.ts"
import {createMyTSNode} from "#~src/createMyTSNode.ts"

import {
	printNode,
	getJSDocAsFormattedStringFromNode
} from "@anio-software/pkg.node-ts-utils"

export function convertFunctionDeclaration(
	node: ts.FunctionDeclaration
): MyTSFunctionDeclaration {
	const modifiers = node.modifiers ? node.modifiers.map(m => {
		return printNode(m).toLowerCase()
	}) : []
	const isAsync = modifiers.includes("async")

	const parameters: Parameter[] = []
	const typeParameters: TypeParameter[] = []

	for (const param of node.parameters) {
		const name = printNode(param.name)
		const type = param.type ? printNode(param.type) : "any"
		const isOptional = param.questionToken !== undefined
		const questionMark = isOptional ? "?" : ""

		parameters.push({
			name: printNode(param.name),
			initializer: param.initializer ? printNode(param.initializer) : "",
			isOptional,
			declaration: `${name}${questionMark}: ${type}`,
			type
		})
	}

	if (node.typeParameters) {
		for (const param of node.typeParameters) {
			typeParameters.push({
				name: printNode(param.name),
				definition: printNode(param)
			})
		}
	}

	let returnType: string = isAsync ? "Promise<any>" : "any"

	if (node.type) {
		returnType = printNode(node.type)
	}

	return createMyTSNode(
		"FunctionDeclaration", {
			name: node.name ? printNode(node.name) : undefined,
			modifiers,
			parameters,
			typeParameters,
			jsDoc: getJSDocAsFormattedStringFromNode(node),
			returnType
		}, {
			tsNode: node,
			sourceFile: createMyTSSourceFile(node.getSourceFile())
		}
	)
}
