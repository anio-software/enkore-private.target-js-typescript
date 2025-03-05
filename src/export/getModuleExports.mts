import ts from "typescript"

import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSExport} from "./MyTSExport.d.mts"
import {convert} from "#~src/export/convert.mts"

function getSymbolType(symbol: ts.Symbol) {
	if (symbol.flags & ts.SymbolFlags.Function) return "function"
	if (symbol.flags & ts.SymbolFlags.Type) return "type"
	if (symbol.flags & ts.SymbolFlags.Variable) return "value"

	return "unknown"
}

export function getModuleExports(
	myProgram: MyTSProgram,
	filePath: string
): Map<string, MyTSExport> {
	const moduleExports: Map<string, MyTSExport> = new Map()
	const {tsChecker} = myProgram

	const sourceFile = myProgram.getSourceFile(filePath)

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

		switch (symbolType) {
			case "function": {
				const declarations: ts.FunctionDeclaration[] = []

				for (const declaration of resolvedSymbol.declarations) {
					if (!ts.isFunctionDeclaration(declaration)) {
						unexpectedDeclaration("FunctionDeclaration", declaration)
					}

					declarations.push(declaration)
				}

				moduleExports.set(
					identifier, {
						kind: "function",
						identifier,
						declarations: declarations.map(decl => {
							return convert(decl)
						})
					}
				)
			} break

			case "value":
			case "type": {
				moduleExports.set(identifier, {
					kind: symbolType,
					identifier
				})
			} break
		}
	}

	return moduleExports

	function unexpectedDeclaration(
		exp: "FunctionDeclaration" | "VariableDeclaration" | "TypeAliasDeclaration",
		node: ts.Node
	): never {
		const actual = ts.SyntaxKind[node.kind]

		throw new Error(`Unexpected declaration, expected '${exp}' got '${actual}'.`)
	}
}
