import ts from "typescript"

export type TSNodeTypeMap = {
	"FunctionDeclaration" : ts.FunctionDeclaration
	"ImportDeclaration"   : ts.ImportDeclaration
	"ExportDeclaration"   : ts.ExportDeclaration
	"VariableDeclaration" : ts.VariableDeclaration
	"TypeAliasDeclaration": ts.TypeAliasDeclaration
}

export type Kinds = keyof TSNodeTypeMap
