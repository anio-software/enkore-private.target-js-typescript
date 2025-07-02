import ts from "typescript"
import type {MyTSImportDeclaration} from "#~src/types/node/MyTSImportDeclaration.ts"
import type {MyTSExportDeclaration} from "#~src/types/node/MyTSExportDeclaration.ts"
import type {MyTSFunctionDeclaration} from "#~src/types/node/MyTSFunctionDeclaration.ts"
import type {MyTSVariableDeclaration} from "#~src/types/node/MyTSVariableDeclaration.ts"
import type {MyTSTypeAliasDeclaration} from "#~src/types/node/MyTSTypeAliasDeclaration.ts"

import {convertImportDeclaration} from "./importDeclaration/index.ts"
import {convertExportDeclaration} from "./exportDeclaration/index.ts"
import {convertFunctionDeclaration} from "./functionDeclaration/index.ts"
import {convertVariableDeclaration} from "./variableDeclaration/index.ts"
import {convertTypeAliasDeclaration} from "./typeAliasDeclaration/index.ts"

function convert(node: ts.ImportDeclaration): MyTSImportDeclaration;
function convert(node: ts.ExportDeclaration): MyTSExportDeclaration;
function convert(node: ts.FunctionDeclaration): MyTSFunctionDeclaration;
function convert(node: ts.VariableDeclaration): MyTSVariableDeclaration;
function convert(node: ts.TypeAliasDeclaration): MyTSTypeAliasDeclaration;

function convert(
	node: ts.ImportDeclaration|ts.ExportDeclaration
): MyTSImportDeclaration|MyTSExportDeclaration;

function convert(node: ts.Node): unknown {
	if (ts.isImportDeclaration(node)) {
		return convertImportDeclaration(node)
	} else if (ts.isExportDeclaration(node)) {
		return convertExportDeclaration(node)
	} else if (ts.isFunctionDeclaration(node)) {
		return convertFunctionDeclaration(node)
	} else if (ts.isVariableDeclaration(node)) {
		return convertVariableDeclaration(node)
	} else if (ts.isTypeAliasDeclaration(node)) {
		return convertTypeAliasDeclaration(node)
	}

	const kind = ts.SyntaxKind[node.kind]

	throw new Error(
		`Cannot convert node of kind '${kind}'.`
	)
}

export {convert}
