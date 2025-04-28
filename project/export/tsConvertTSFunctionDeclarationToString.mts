import type {MyTSFunctionDeclaration} from "./MyTSFunctionDeclaration.mts"

type Options = {
	overwriteFunctionName?: string
	asType?: boolean
	useJSDoc?: boolean
}

export function tsConvertTSFunctionDeclarationToString(
	declaration: MyTSFunctionDeclaration, options?: Options
): string {
	let signature = ``
	let functionName : string = declaration.name ?? ""

	if (options?.overwriteFunctionName !== undefined) {
		functionName = options.overwriteFunctionName
	}

	if (declaration.jsDoc.length && options?.useJSDoc === true) {
		signature += declaration.jsDoc + "\n"
	}

	if (options?.asType === true) {
		if (functionName.length) {
			signature += `type ${functionName} = `
		} else {
			signature += `type Function = `
		}
	} else {
		if (functionName.length) {
			signature += `declare function ${functionName}`
		} else {
			signature += `declare function fn`
		}
	}

	const typeParams = declaration.typeParameters.map(t => t.definition)

	if (typeParams.length) {
		signature += `<${typeParams.join(", ")}>`
	}

	signature += `(\n`

	if (declaration.parameters.length) {
		for (const param of declaration.parameters) {
			// todo:
			// would need to handle the case where
			// jsdoc would contain something like "* @param"
			// (i.e. we would need to add the start /* and end comment */ markers ourselves)

			// indent() is in @aniojs/node-ts-utils repo
			//if (param.jsdoc.length && options.use_jsdocs) {
			//	signature += indent(param.jsdoc, 1) + "\n"
			//}

			signature += `\t${param.declaration},\n`
		}

		signature = signature.slice(0, -2)
	}

	signature += `\n) ${options?.asType === true ? "=>" : ":"} ${declaration.returnType}`

	return signature
}
