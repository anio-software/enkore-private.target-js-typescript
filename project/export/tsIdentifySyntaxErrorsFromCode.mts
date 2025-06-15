import type {MyTSDiagnosticMessage} from "#~src/types/MyTSDiagnosticMessage.mts"
import {randomIdentifierSync} from "@aniojs/random-ident"
import ts from "typescript"
import {convertTSDiagnostic} from "#~src/utils/convertTSDiagnostic.mts"

export function tsIdentifySyntaxErrorsFromCode(
	code: string,
	isTSX: boolean
): MyTSDiagnosticMessage[] {
	const syntheticFileName = `/synthetic_${randomIdentifierSync(32)}.${isTSX ? "tsx" : "ts"}`
	const compilerOptions: ts.CompilerOptions = {
		module: ts.ModuleKind.ESNext,
		moduleResolution: ts.ModuleResolutionKind.NodeNext,
		target: ts.ScriptTarget.ESNext,
		strict: true
	}

	const compilerHost = ts.createCompilerHost(compilerOptions, false)

	compilerHost.fileExists = (fileName) => {
		return fileName === syntheticFileName
	}

	compilerHost.readFile = (fileName) => {
		if (fileName === syntheticFileName) {
			return code
		}

		// needed, otherwise check takes much much longer
		return undefined
	}

	const prog = ts.createProgram(
		[syntheticFileName], compilerOptions, compilerHost
	)

	return prog.getSyntacticDiagnostics().map(dia => {
		return convertTSDiagnostic(dia)
	})
}
