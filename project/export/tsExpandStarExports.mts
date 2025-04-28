import ts from "typescript"
import type {MyTSCompilerOptions} from "#~export/MyTSCompilerOptions.mts"
import {getMyTSCompilerOptionsInternals} from "#~src/getMyTSCompilerOptionsInternals.mts"
import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.mts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.mts"
import {getMyTSTransformationContextInternals} from "#~src/getMyTSTransformationContextInternals.mts"
import {getModuleExportsSimplified} from "#~src/utils/getModuleExportsSimplified.mts"

import {
	transformSourceFile,
	printNode
} from "@aniojs/node-ts-utils"

export function tsExpandStarExports(
	transformContext: MyTSTransformationContext|undefined,
	compilerOptions: MyTSCompilerOptions
): MyTSSourceFileTransformer {
	const {tsCompilerOptions} = getMyTSCompilerOptionsInternals(compilerOptions)

	const context = transformContext ? getMyTSTransformationContextInternals(
		transformContext
	).tsTransformationContext : undefined

	return (inputSourceFile) => {
		const {tsSourceFile} = getMyTSSourceFileInternals(inputSourceFile)

		const transformed = transformSourceFile(tsSourceFile, (oldNode, {factory}) => {
			if (!ts.isExportDeclaration(oldNode)) {
				return oldNode
			} else if (oldNode.exportClause) {
				return oldNode
			} else if (!oldNode.moduleSpecifier) {
				return oldNode
			}

			const moduleSpecifier = printNode(oldNode.moduleSpecifier).slice(1, -1)

			const {resolvedModule} = ts.resolveModuleName(
				moduleSpecifier,
				tsSourceFile.fileName,
				tsCompilerOptions,
				{
					fileExists: ts.sys.fileExists,
					readFile: ts.sys.readFile
				}
			)

			if (!resolvedModule) {
				return oldNode
			}

			const {resolvedFileName} = resolvedModule

			const moduleExports = getModuleExportsSimplified(
				tsCompilerOptions,
				resolvedFileName
			)

			const exportSpecifiers: ts.ExportSpecifier[] = []

			for (const [name, isType] of moduleExports) {
				if (oldNode.isTypeOnly && !isType) continue

				exportSpecifiers.push(
					factory.createExportSpecifier(
						oldNode.isTypeOnly ? false : isType,
						undefined,
						name
					)
				)
			}

			return factory.createExportDeclaration(
				[],
				oldNode.isTypeOnly,
				factory.createNamedExports(exportSpecifiers),
				factory.createStringLiteral(moduleSpecifier)
			)
		}, context)

		return createMyTSSourceFile(transformed, undefined)
	}
}
