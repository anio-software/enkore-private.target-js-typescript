import ts from "typescript"
import type {MyTSModule} from "./MyTSModule.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.mts"
import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.mts"
import type {MyTSSourceFileTransformer} from "./MyTSSourceFileTransformer.mts"
import type {MyTSTransformationContext} from "#~src/types/MyTSTransformationContext.mts"
import {_transformTSSourceFile} from "#~src/utils/_transformTSSourceFile.mts"
import {convertTSDiagnostic} from "#~src/utils/convertTSDiagnostic.mts"
import {createMyTSTransformationContext} from "#~src/createMyTSTransformationContext.mts"

function convertTransform(
	transform: MyTSSourceFileTransformer|MyTSSourceFileTransformer[]|undefined
): MyTSSourceFileTransformer[] {
	if (transform && Array.isArray(transform)) {
		return transform
	} else if (transform) {
		return [transform]
	}

	return []
}

export function tsGenerateDeclarationsForModule(
	mod: MyTSModule,
	transformFactory?: (
		context: MyTSTransformationContext
	) => MyTSSourceFileTransformer|MyTSSourceFileTransformer[]
): {
	diagnosticMessages: MyTSDiagnosticMessage[]
	declarations: string
} {
	const {tsSourceFile} = getMyTSSourceFileInternals(mod.source)
	const {tsProgram} = getMyTSProgramInternals(mod.program)

	let declarations = ""

	const expectedDtsFilePath: string = (() => {
		const path = tsSourceFile.fileName

		if (path.endsWith(".mts")) {
			return `${path.slice(0, -4)}.d.mts`
		} else if (path.endsWith(".tsx")) {
			return `${path.slice(0, -4)}.d.ts`
		} else if (path.endsWith(".ts")) {
			return `${path.slice(0, -3)}.d.ts`
		}

		// yeah, currently no support for .cts
		return ""
	})()

	const emitResult = tsProgram.emit(
		tsSourceFile,
		(fileName, text) => {
			if (fileName === expectedDtsFilePath) {
				declarations = text
			}
		},
		undefined,
		true,
		{
			afterDeclarations: [
				(transformContext) => {
					const transformer = convertTransform(
						typeof transformFactory === "function" ? transformFactory(
							createMyTSTransformationContext(transformContext)
						) : []
					)

					return function transform(src) {
						if (ts.isBundle(src)) {
							throw new Error(
								`Unexpected ts.Bundle: bundles are not supported.`
							)
						}

						if (!transform.length) {
							return src
						}

						return _transformTSSourceFile(src, transformer)
					}
				}
			]
		}
	)

	return {
		declarations,
		diagnosticMessages: emitResult.diagnostics.map(diagnostic => {
			return convertTSDiagnostic(diagnostic, true)
		})
	}
}
