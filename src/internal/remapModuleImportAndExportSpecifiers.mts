import ts from "typescript"

import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"
import type {MyTSImportDeclaration} from "#~src/export/MyTSImportDeclaration.d.mts"
import type {MyTSExportDeclaration} from "#~src/export/MyTSExportDeclaration.d.mts"
import {convert} from "#~src/export/convert.mts"

export type Mapper = (
	declaration: MyTSImportDeclaration|MyTSExportDeclaration
) => string|undefined

function transformerFactory(mapper: Mapper) {
	return function transformer(context: ts.TransformationContext) {
		return (rootNode: ts.Node) => {
			const visit = (node: ts.Node) : ts.Node => {
				// todo rename variable
				const newNode = ts.visitEachChild(node, visit, context)

				if (!ts.isImportDeclaration(newNode) &&
				    !ts.isExportDeclaration(newNode)) {
					return newNode
				}

				if (!newNode.moduleSpecifier) return newNode

				const defaultImportSpecifier = newNode.moduleSpecifier.getText(
					newNode.getSourceFile()
				).slice(1, -1)

				const newImportSpecifier = mapper(
					convert(newNode)
				) ?? defaultImportSpecifier

				if (ts.isImportDeclaration(newNode)) {
					return context.factory.createImportDeclaration(
						newNode.modifiers,
						newNode.importClause,
						ts.factory.createStringLiteral(newImportSpecifier),
						newNode.attributes
					)
				}

				return context.factory.createExportDeclaration(
					newNode.modifiers,
					newNode.isTypeOnly,
					newNode.exportClause,
					ts.factory.createStringLiteral(newImportSpecifier),
					newNode.attributes
				)
			}

			return ts.visitNode(rootNode, visit)
		}
	}
}

export function remapModuleImportAndExportSpecifiers(
	myProgram: MyTSProgram,
	filePath: string,
	mapper: Mapper
): ts.Node {
	const sourceFile = myProgram.getSourceFile(filePath)

	const transformer = transformerFactory(mapper)

	const {transformed} = ts.transform(sourceFile, [transformer])

	return transformed[0]
}
