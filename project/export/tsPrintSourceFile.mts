import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.mts"
import {getMyTSSourceFileInternals} from "#~src/getMyTSSourceFileInternals.mts"
import {printNode} from "@aniojs/node-ts-utils"

export function tsPrintSourceFile(
	source: MyTSSourceFile
): string {
	return printNode(
		getMyTSSourceFileInternals(source).tsSourceFile
	)
}
