import ts from "typescript"

import type {
	Parameter,
	TypeParameter,
	MyTSFunctionDeclaration
} from "#~src/internal/types/MyTSFunctionDeclaration.d.mts"

import {getJSDocAsStringFromNode} from "@aniojs/node-ts-utils"

export function convertFunctionDeclaration(
	fnNode: ts.FunctionDeclaration
): MyTSFunctionDeclaration {
	const sourceFile = fnNode.getSourceFile()
	const functionName = fnNode.name ? fnNode.name.getText(sourceFile) : undefined

	const modifiers: string[] = fnNode.modifiers ? fnNode.modifiers.map(modifier => {
		return modifier.getText(sourceFile).toLowerCase()
	}) : []

	const typeParameters: TypeParameter[] = []

	if (fnNode.typeParameters) {
		for (const typeParameter of fnNode.typeParameters) {
			typeParameters.push({
				name: typeParameter.name.getText(sourceFile),
				definition: typeParameter.getText(sourceFile)
			})
		}
	}

	const parameters: Parameter[] = []

	if (fnNode.parameters) {
		for (const param of fnNode.parameters) {
			const name: string = param.name.getText(sourceFile)
			const type: string = param.type ? param.type.getText(sourceFile) : "any"
			const isOptional = param.questionToken !== undefined
			const questionMark = isOptional ? "?" : ""

			parameters.push({
				name,
				type,
				jsDoc: getJSDocAsStringFromNode(param),
				definition: `${name}${questionMark}: ${type}`,
				isOptional
			})
		}
	}

	let returnType: string = modifiers.includes("async") ? "Promise<any>" : "any"

	if (fnNode.type) {
		returnType = fnNode.type.getText(sourceFile)
	}

	return {
		name: functionName,
		typeParameters,
		parameters,
		returnType,
		modifiers,
		jsDoc: getJSDocAsStringFromNode(fnNode)
	}
}
