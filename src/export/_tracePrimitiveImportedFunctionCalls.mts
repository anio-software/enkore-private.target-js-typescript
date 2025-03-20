import ts from "typescript"
import type {MyTSModule} from "./MyTSModule.d.mts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {astFilter, printNode} from "@aniojs/node-ts-utils"

//
// this is only really here because of enkore
//
type StringLiteralArgument = {
	kind: "string"
	value: string
}

type NumericLiteralArgument = {
	kind: "number"
	value: string
}

type BooleanLiteralArgument = {
	kind: "boolean"
	value: boolean
}

type UnknownArgument = {
	kind: "unknown"
}

type FunctionArgument = StringLiteralArgument  |
                        NumericLiteralArgument |
                        BooleanLiteralArgument |
                        UnknownArgument

type PrimitiveImportedFunctionCall = {
	originatingModule: string
	realFunctionName: string
	arguments: FunctionArgument[]
}

function convertArgument(arg: ts.Expression): FunctionArgument {
	if (ts.isStringLiteral(arg)) {
		return {
			kind: "string",
			value: printNode(arg).slice(1, -1)
		}
	} else if (ts.isNumericLiteral(arg)) {
		return {
			kind: "number",
			value: printNode(arg)
		}
	} else if (arg.kind === ts.SyntaxKind.FalseKeyword) {
		return {
			kind: "boolean",
			value: false
		}
	} else if (arg.kind === ts.SyntaxKind.TrueKeyword) {
		return {
			kind: "boolean",
			value: true
		}
	}

	return {
		kind: "unknown"
	}
}

function walk(
	tsChecker: ts.TypeChecker,
	tsSourceFile: ts.SourceFile,
	callExpr: ts.CallExpression,
	symbol: ts.Symbol|undefined,
	callback: (call: PrimitiveImportedFunctionCall) => void
) {
	if (!symbol) return
	if (!symbol.declarations) return
	if (!symbol.declarations.length) return

	if (symbol.declarations.length > 1) {
		// todo: log warning/error?
	}

	const declaration = symbol.declarations[0]

	if (ts.isVariableDeclaration(declaration) && declaration.initializer) {
		walk(
			tsChecker,
			tsSourceFile,
			callExpr,
			tsChecker.getSymbolAtLocation(declaration.initializer),
			callback
		)
	} else if (ts.isImportSpecifier(declaration)) {
		const importDeclaration = declaration.parent.parent.parent
		const moduleSpecifier = printNode(importDeclaration.moduleSpecifier)
		const propertyName = printNode(declaration.propertyName ?? declaration.name)

		callback({
			originatingModule: moduleSpecifier.slice(1, -1),
			realFunctionName: propertyName,
			arguments: callExpr.arguments.map(arg => {
				return convertArgument(arg)
			})
		})
	}
}

export function _tracePrimitiveImportedFunctionCalls(
	mod: MyTSModule
): PrimitiveImportedFunctionCall[] {
	const ret: PrimitiveImportedFunctionCall[] = []
	const {tsChecker} = getMyTSProgramInternals(mod.program)
	const {tsSourceFile} = getMyTSSourceFileInternals(mod.source)

	const nodes = astFilter(tsSourceFile, ts.isCallExpression)

	for (const node of nodes) {
		const exprSymbol = tsChecker.getSymbolAtLocation(node.expression)

		walk(tsChecker, tsSourceFile, node, exprSymbol, (call) => {
			ret.push(call)
		})
	}

	return ret
}
