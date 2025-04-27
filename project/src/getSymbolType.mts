import ts from "typescript"

export function getSymbolType(symbol: ts.Symbol) {
	if (symbol.flags & ts.SymbolFlags.Function) return "function"
	if (symbol.flags & ts.SymbolFlags.Type) return "type"
	if (symbol.flags & ts.SymbolFlags.Variable) return "value"
	if (symbol.flags & ts.SymbolFlags.ValueModule) return "module"

	return "unknown"
}
