import ts from "typescript"

import type {
	MyTSFunctionDeclaration,
	Parameter,
	TypeParameter
} from "#~src/types/MyTSFunctionDeclaration.d.mts"

import {
	printNode,
	getJSDocAsFormattedStringFromNode
} from "@aniojs/node-ts-utils"

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
		parameters.push({
			name: printNode(param.name),
			initializer: param.initializer ? printNode(param.initializer) : "",
			isOptional: param.questionToken !== undefined,
			type: param.type ? printNode(param.type) : "any"
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

	return {
		name: node.name ? printNode(node.name) : undefined,
		modifiers,
		parameters,
		typeParameters,
		jsDoc: getJSDocAsFormattedStringFromNode(node),
		returnType
	}
}
