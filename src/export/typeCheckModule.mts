import ts from "typescript"
import type {MyTSModule} from "./MyTSModule.d.mts"
import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.d.mts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {convertTSDiagnostic} from "#~src/utils/convertTSDiagnostic.mts"

export function typeCheckModule(mod: MyTSModule): MyTSDiagnosticMessage[] {
	const {tsProgram} = getMyTSProgramInternals(mod.program)
	const {tsSourceFile} = getMyTSSourceFileInternals(mod.source)

	const diagnostics = ts.getPreEmitDiagnostics(tsProgram, tsSourceFile)

	return diagnostics.map(diagnostic => {
		return convertTSDiagnostic(diagnostic, true)
	})
}
