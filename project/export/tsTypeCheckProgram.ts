import ts from "typescript"
import type {MyTSProgram} from "./MyTSProgram.ts"
import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.ts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.ts"
import {convertTSDiagnostic} from "#~src/utils/convertTSDiagnostic.ts"

export function tsTypeCheckProgram(program: MyTSProgram): {
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
