import type {MyTSModule} from "./MyTSModule.ts"
import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.ts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.ts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.ts"
import {convertTSDiagnostic} from "#~src/utils/convertTSDiagnostic.ts"

export function tsTypeCheckModule(
	mod: MyTSModule,
	includeAllDiagnostics?: boolean
): MyTSDiagnosticMessage[] {
	const {tsProgram} = getMyTSProgramInternals(mod.program)
	const {tsSourceFile} = getMyTSSourceFileInternals(mod.source)

	return (
		includeAllDiagnostics === true ? [
			...getGlobalDiagnostics(),
			...getSourceFileDiagnostics()
		] : [
			...getSourceFileDiagnostics()
		]
	).map(diagnostic => {
		return convertTSDiagnostic(diagnostic)
	})

	function getGlobalDiagnostics() {
		return [
			...tsProgram.getConfigFileParsingDiagnostics(),
			...tsProgram.getOptionsDiagnostics(),
			...tsProgram.getGlobalDiagnostics()
		]
	}

	function getSourceFileDiagnostics() {
		return [
			...tsProgram.getSyntacticDiagnostics(tsSourceFile),
			...tsProgram.getSemanticDiagnostics(tsSourceFile),
			...tsProgram.getDeclarationDiagnostics(tsSourceFile)
		]
	}
}
