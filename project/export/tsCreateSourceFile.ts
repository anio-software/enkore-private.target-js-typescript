import fs from "node:fs"

import type {MyTSSourceFile} from "#~src/types/MyTSSourceFile.ts"
import {tsCreateSourceFileFromCode} from "./tsCreateSourceFileFromCode.ts"

export function tsCreateSourceFile(
	filePath: string
): MyTSSourceFile {
	return tsCreateSourceFileFromCode(
		fs.readFileSync(filePath).toString(), {filePath}
	)
}
