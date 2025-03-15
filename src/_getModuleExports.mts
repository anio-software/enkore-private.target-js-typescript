import ts from "typescript"

import type {MyTSProgram} from "./types/MyTSProgram.d.mts"
import type {MyTSExport} from "./types/MyTSExport.d.mts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.d.mts"
import type {Nodes} from "./types/node/Map.d.mts"
import {convert} from "./convert/convert.mts"
import {getMyTSProgramInternals} from "./getMyTSProgramInternals.mts"

function getSymbolType(symbol: ts.Symbol) {
	if (symbol.flags & ts.SymbolFlags.Function) return "function"
	if (symbol.flags & ts.SymbolFlags.Type) return "type"
	if (symbol.flags & ts.SymbolFlags.Variable) return "value"

	return "unknown"
}

export function _getModuleExports(
	myProgram: MyTSProgram,
	filePath: string,
	associatedSourceFile: MyTSSourceFile
): Map<string, MyTSExport> {
	const moduleExports: Map<string, MyTSExport> = new Map()

	const {tsChecker} = getMyTSProgramInternals(myProgram)
	const sourceFile = getMyTSProgramInternals(myProgram).getTSSourceFile(filePath)

	const moduleSymbol = tsChecker.getSymbolAtLocation(sourceFile)

	if (!moduleSymbol) return moduleExports

	const exportSymbols = tsChecker.getExportsOfModule(moduleSymbol)

	for (const symbol of exportSymbols) {
		const identifier = symbol.name
		const resolvedSymbol = symbol.flags & ts.SymbolFlags.Alias ? tsChecker.getAliasedSymbol(symbol) : symbol
		const symbolType = getSymbolType(resolvedSymbol)

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
		}
	}

	return moduleExports

	function patch<Node extends Nodes>(myNode: Node): Node {
		;(myNode._myTSNode.associatedSourceFile as any) = associatedSourceFile;

		return myNode
	}
}
