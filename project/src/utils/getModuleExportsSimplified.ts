import ts from "typescript"
import {resolveSymbol} from "#~src/resolveSymbol.ts"
import {getSymbolType} from "#~src/getSymbolType.ts"

type Export = [string, boolean]

export function getModuleExportsSimplified(
	tsCompilerOptions: ts.CompilerOptions,
	filePath: string
): Export[] {
	const prog = ts.createProgram(
		[filePath],
		tsCompilerOptions
	)

	const src = prog.getSourceFile(filePath)

	if (!src) {
		return []
	}

	const tsChecker = prog.getTypeChecker()

	const mod = tsChecker.getSymbolAtLocation(src)

	if (!mod) {
		return []
	}

	const ret: Export[] = []

	for (const symbol of tsChecker.getExportsOfModule(mod)) {
		const resolvedSymbol = resolveSymbol(tsChecker, symbol)
		const symbolType = getSymbolType(resolvedSymbol)

		ret.push([symbol.name, symbolType === "type"])
	}

	return ret
}
