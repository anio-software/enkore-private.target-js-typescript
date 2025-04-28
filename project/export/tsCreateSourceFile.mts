import fs from "node:fs"

import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.mts"
import {tsCreateSourceFileFromCode} from "./tsCreateSourceFileFromCode.mts"

export function tsCreateSourceFile(
	filePath: string
): MyTSSourceFile {
	return tsCreateSourceFileFromCode(
		fs.readFileSync(filePath).toString(), {filePath}
	)
}
