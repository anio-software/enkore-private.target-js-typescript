import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.d.mts"
import {getTSSourceFile} from "#~src/getTSSourceFile.mts"
import {printNode} from "@aniojs/node-ts-utils"

export function printSourceFile(
	source: MyTSSourceFile
): string {
	return printNode(getTSSourceFile(source))
}
