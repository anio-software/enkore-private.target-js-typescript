import type {MyTSModule} from "./MyTSModule.d.mts"
import {getMyTSProgramInternals} from "#~src/getMyTSProgramInternals.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"

//
// this is only really here because of enkore
//
type StringLiteralArgument = {
	kind: "string"
	value: string
}

type NumericLiteralArgument = {
	kind: "number"
	value: number
}

type BooleanLiteralArgument = {
	kind: "boolean"
	value: boolean
}

type UnknownArgument = {
	kind: "unknown"
}

type FunctionArgument = StringLiteralArgument  |
                        NumericLiteralArgument |
                        BooleanLiteralArgument |
                        UnknownArgument

type PrimitiveImportedFunctionCall = {
	originatingModule: string
	realFunctionName: string
	arguments: FunctionArgument[]
}

export function _tracePrimitiveImportedFunctionCalls(
	mod: MyTSModule
): PrimitiveImportedFunctionCall[] {
	const {tsChecker} = getMyTSProgramInternals(mod.program)
	const {tsSourceFile} = getMyTSSourceFileInternals(mod.source)

	

	return []
}
