import ts from "typescript"

export function resolveSymbol(
	tsChecker: ts.TypeChecker,
	symbol: ts.Symbol
) {
	if (symbol.flags & ts.SymbolFlags.Alias) {
		return tsChecker.getAliasedSymbol(symbol)
	}

	return symbol
}
