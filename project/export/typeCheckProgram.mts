import ts from "typescript"
import type {MyTSProgram} from "./MyTSProgram.mts"
import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.mts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.mts"
import {convertTSDiagnostic} from "#~src/utils/convertTSDiagnostic.mts"

export function typeCheckProgram(program: MyTSProgram): {
	hasErrors: boolean
	diagnosticMessages: MyTSDiagnosticMessage[]
} {
	const {tsProgram} = getMyTSProgramInternals(program)

	const emitResult = tsProgram.emit(
		undefined, () => {}, undefined, true
	)

	const allDiagnostics = ts.getPreEmitDiagnostics(
		tsProgram
	).concat(emitResult.diagnostics)

	return {
		hasErrors: emitResult.emitSkipped,
		diagnosticMessages: allDiagnostics.map(diagnostic => {
			return convertTSDiagnostic(diagnostic)
		})
	}
}
