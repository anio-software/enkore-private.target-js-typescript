import ts from "typescript"
import type {MyTSModule} from "../types/MyTSModule.ts"
import type {MyTSTopLevelTypeDescriptor} from "../types/MyTSTopLevelTypeDescriptor.ts"
import {tsConvertTSImportDeclarationToString} from "#~export/tsConvertTSImportDeclarationToString.ts"

import {
	astFilter,
	getTypeAliasDeclarationAsFormattedString
} from "@anio-software/pkg.node-ts-utils"
import {getTypeNamesReferencedInNode} from "@anio-software/pkg.node-ts-utils"
import type {MyTSImportDeclaration} from "#~src/types/node/MyTSImportDeclaration.ts"

function importReferencesAValue(
	tsChecker: ts.TypeChecker,
	importDecl: MyTSImportDeclaration
): boolean|"unknown" {
	const tsNode = importDecl._myTSNode.tsNode as ts.ImportDeclaration

	if (!tsNode.importClause) return false
	if (!tsNode.importClause.namedBindings) return false
	if (!ts.isNamedImports(tsNode.importClause.namedBindings)) return false

	const {namedBindings} = tsNode.importClause

	// we know this map is flattened so it
	// is safe to assume every named import in this list
	// only contains one member
	const [element] = namedBindings.elements

	const symbol = tsChecker.getSymbolAtLocation(element.name)

	if (!symbol) return "unknown"

	const resolvedSymbol = (() => {
		if (symbol.flags & ts.SymbolFlags.Alias) {
			return tsChecker.getAliasedSymbol(symbol)
		}

		return symbol
	})()

	if (resolvedSymbol.flags & ts.SymbolFlags.Value) {
		return true
	} else if (resolvedSymbol.flags & ts.SymbolFlags.Type) {
		return false
	}

	return "unknown"
}

export function _getModuleTopLevelTypeMap(
	sourceFile: ts.SourceFile,
	tsChecker: ts.TypeChecker,
	importMap: MyTSModule["moduleImports"]
): Map<string, MyTSTopLevelTypeDescriptor> {
	const topTypes: Map<string, MyTSTopLevelTypeDescriptor> = new Map()

	for (const [key, value] of importMap.entries()) {
		const declaration = tsConvertTSImportDeclarationToString(value)

		// special case:
		// a type only import can still reference a value, so we also
		// must provide "typeof:key" for this import
		const referencesAValue = importReferencesAValue(tsChecker, value)

		if (referencesAValue === true || !value.isTypeOnly) {
			add(`typeof:${key}`)
		} else if (value.isTypeOnly) {
			add(key)
		}

		function add(typeName: string) {
			// we know this map is flattened so it
			// is safe to assume every named import in this list
			// only contains one member
			topTypes.set(typeName, {
				name: typeName,
				declaration,
				source: "import",
				dependsOnTypes: [],
				importDeclaration: value
			})
		}
	}

	//
	// get all other top level types like "Promise", "Awaited" etc.
	//
	for (const symbol of tsChecker.getSymbolsInScope(sourceFile, ts.SymbolFlags.Type)) {
		if (topTypes.has(symbol.name)) continue

		topTypes.set(symbol.name, {
			name: symbol.name,
			declaration: `/* type '${symbol.name}' is in global scope */`,
			source: "module",
			dependsOnTypes: []
		})
	}

	const moduleTypeDeclarations = astFilter(
		sourceFile, (node) => {
			return ts.isTypeAliasDeclaration(node)
		}
	)

	for (const typeDeclaration of moduleTypeDeclarations) {
		// only handle top level type declarations
		if (typeDeclaration.parent !== sourceFile) continue

		const typeName = typeDeclaration.name.getText(sourceFile)

		const dependsOnTypes = getTypeNamesReferencedInNode(
			tsChecker, typeDeclaration
		)
		//
		// handle the case where the type references itself
		//
		.filter(t => t !== typeName)

		topTypes.set(typeName, {
			name: typeName,
			declaration: getTypeAliasDeclarationAsFormattedString(
				typeDeclaration, {
					dropExportKeyword: true
				}
			),
			source: "module",
			dependsOnTypes
		})
	}

	return topTypes
}
