import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSDiagnosticMessage} from "./MyTSDiagnosticMessage.d.mts"
import {convertEmitResult} from "#~src/utils/convertEmitResult.mts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.mts"

export function typeCheckProgram(program: MyTSProgram): {
	hasErrors: boolean
	diagnosticMessages: MyTSDiagnosticMessage[]
} {
	const {tsProgram} = getMyTSProgramInternals(program)

	const result = tsProgram.emit(
		undefined, () => {}, undefined, true
	)

	const {emitSkipped, diagnosticMessages} = convertEmitResult(
		tsProgram, result
	)

	return {
		hasErrors: emitSkipped,
		diagnosticMessages
	}
}
