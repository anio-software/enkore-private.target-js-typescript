import fs from "node:fs"

import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.mts"
import {createSourceFileFromCode} from "./createSourceFileFromCode.mts"

export function createSourceFile(
	filePath: string
): MyTSSourceFile {
	return createSourceFileFromCode(
		fs.readFileSync(filePath).toString(), {filePath}
	)
}
