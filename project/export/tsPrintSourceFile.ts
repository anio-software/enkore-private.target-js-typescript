import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.ts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.ts"
import {printNode} from "@anio-software/pkg.node-ts-utils"

export function tsPrintSourceFile(
	source: MyTSSourceFile
): string {
	return printNode(
		getMyTSSourceFileInternals(source).tsSourceFile
	)
}
