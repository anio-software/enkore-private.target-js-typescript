import type {
	MyTSSourceFile,
	Internal as MyTSSourceFileInternal
} from "#~src/types/MyTSSourceFile.d.mts"
import {printNode} from "@aniojs/node-ts-utils"

export function printSourceFile(
	source: MyTSSourceFile
): string {
	const sourceInternal = source.__internal as MyTSSourceFileInternal

	return printNode(
		sourceInternal.sourceFile
	)
}
