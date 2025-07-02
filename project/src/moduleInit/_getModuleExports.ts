import ts from "typescript"

import type {MyTSExport} from "../types/MyTSExport.ts"
import type {MyTSSourceFile} from "../types/MyTSSourceFile.ts"
import type {Nodes} from "../types/node/Map.ts"
import {convert} from "../convert/convert.ts"
import {getSymbolType} from "#~src/getSymbolType.ts"
import {resolveSymbol} from "#~src/resolveSymbol.ts"

export function _getModuleExports(
	sourceFile: ts.SourceFile,
	tsChecker: ts.TypeChecker,
	associatedSourceFile: MyTSSourceFile
): Map<string, MyTSExport> {
	const moduleExports: Map<string, MyTSExport> = new Map()

	const moduleSymbol = tsChecker.getSymbolAtLocation(sourceFile)

	if (!moduleSymbol) return moduleExports

	const exportSymbols = tsChecker.getExportsOfModule(moduleSymbol)

	for (const symbol of exportSymbols) {
		const identifier = symbol.name
		const resolvedSymbol = resolveSymbol(tsChecker, symbol)
		const symbolType = getSymbolType(resolvedSymbol)

		// ignore unknown symbol types
		// todo: log warning
		if (symbolType === "unknown") continue

		// todo: log error instead of throwing error
		if (!resolvedSymbol.declarations) {
			throw new Error(`declarations is undefined!`)
		}

		const declaration = resolvedSymbol.declarations[0]

		if (symbolType === "function") {
			moduleExports.set(identifier, {
				kind: "function",
				declarations: resolvedSymbol.declarations.map(decl => {
					// todo: assert declaration type
					return patch(convert(decl as ts.FunctionDeclaration))
				})
			})
		} else if (symbolType === "value" && ts.isVariableDeclaration(declaration)) {
			moduleExports.set(identifier, {
				kind: "value",
				declaration: patch(convert(declaration))
			})
		} else if (symbolType === "type" && ts.isTypeAliasDeclaration(declaration)) {
			moduleExports.set(identifier, {
				kind: "type",
				declaration: patch(convert(declaration))
			})
		} else if (symbolType === "module" && ts.isSourceFile(declaration)) {
			moduleExports.set(identifier, {
				kind: "module"
			})
		}
	}

	return moduleExports

	function patch<Node extends Nodes>(myNode: Node): Node {
		;(myNode._myTSNode.associatedSourceFile as any) = associatedSourceFile;

		return myNode
	}
}
