import type {MyTSVirtualProgramFile} from "./MyTSVirtualProgramFile.mts"
import path from "node:path"
import {normalizePath} from "#~src/utils/normalizePath.mts"
import {getVirtualFileMarker} from "#~src/getVirtualFileMarker.mts"

export function defineVirtualProgramFile(
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
