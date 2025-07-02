import ts from "typescript"
import type {MyTSCompilerOptions} from "#~export/MyTSCompilerOptions.ts"
import {getMyTSCompilerOptionsInternals} from "#~src/getMyTSCompilerOptionsInternals.ts"
import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.ts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.ts"
import {createMyTSSourceFile} from "#~src/createMyTSSourceFile.ts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.ts"
import {getMyTSTransformationContextInternals} from "#~src/getMyTSTransformationContextInternals.ts"
import {getModuleExportsSimplified} from "#~src/utils/getModuleExportsSimplified.ts"

import {
	transformSourceFile,
	printNode
} from "@anio-software/pkg.node-ts-utils"

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
