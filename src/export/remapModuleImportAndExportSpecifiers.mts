import ts from "typescript"

import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.d.mts"
import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.d.mts"
import {convert} from "./convert.mts"

type Mapper = (
	declaration: MyTSImportDeclaration|MyTSExportDeclaration
) => string

function transformerFactory(mapper: Mapper) {
	return function transformer(context: ts.TransformationContext) {
		return (rootNode: ts.Node) => {
			const visit = (node: ts.Node) : ts.Node => {
				const newNode = ts.visitEachChild(node, visit, context)

				if (ts.isImportDeclaration(newNode)) {
					const newImportSpecifier = mapper(convert(newNode))

					return context.factory.createImportDeclaration(
						newNode.modifiers,
						newNode.importClause,
						ts.factory.createStringLiteral(newImportSpecifier),
						newNode.attributes
					)
				} else if (ts.isExportDeclaration(newNode) && newNode.moduleSpecifier) {
					const newImportSpecifier = mapper(convert(newNode))

					return context.factory.createExportDeclaration(
						newNode.modifiers,
						newNode.isTypeOnly,
						newNode.exportClause,
						ts.factory.createStringLiteral(newImportSpecifier),
						newNode.attributes
					)
				}

				return newNode
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
