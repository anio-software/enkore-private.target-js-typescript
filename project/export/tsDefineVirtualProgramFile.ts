import type {MyTSVirtualProgramFile} from "./MyTSVirtualProgramFile.ts"
import path from "node:path"
import {normalizePath} from "#~src/utils/normalizePath.ts"
import {getVirtualFileMarker} from "#~src/getVirtualFileMarker.ts"

export function tsDefineVirtualProgramFile(
	filePath: string, content: string
): MyTSVirtualProgramFile {
	filePath = normalizePath(filePath)

	const parentDir = path.dirname(filePath)
	const fileName = path.basename(filePath)
	const marker = getVirtualFileMarker()

	return {
		path: path.join(parentDir, `${marker}${fileName}`),
		content
	}
}
