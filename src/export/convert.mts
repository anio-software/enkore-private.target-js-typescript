import ts from "typescript"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.d.mts"
import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.d.mts"
import type {MyTSFunctionDeclaration} from "./MyTSFunctionDeclaration.d.mts"

import {convertImportDeclaration} from "#~src/internal/convert/importDeclaration/index.mts"
import {convertExportDeclaration} from "#~src/internal/convert/exportDeclaration/index.mts"
import {convertFunctionDeclaration} from "#~src/internal/convert/functionDeclaration/index.mts"

function convert(node: ts.ImportDeclaration): MyTSImportDeclaration;
function convert(node: ts.ExportDeclaration): MyTSExportDeclaration;
function convert(node: ts.FunctionDeclaration): MyTSFunctionDeclaration;

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
	}

	const kind = ts.SyntaxKind[node.kind]

	throw new Error(
		`Cannot convert node of kind '${kind}'.`
	)
}

export {convert}
