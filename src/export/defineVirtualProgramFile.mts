import type {VirtualProgramFile} from "./VirtualProgramFile.d.mts"
import path from "node:path"
import {getVirtualFileMarker} from "#~src/internal/getVirtualFileMarker.mts"

function normalizePath(p: string) {
	let normalized = path.normalize(p)

	if (normalized.startsWith("/")) {
		normalized = normalized.slice(1)
	}

	return normalized
}

export function defineVirtualProgramFile(
	filePath: string, content: string
): VirtualProgramFile {
	filePath = normalizePath(filePath)

	const parentDir = path.dirname(filePath)
	const fileName = path.basename(filePath)
	const marker = getVirtualFileMarker()

	return {
		path: path.join(parentDir, `${marker}${fileName}`),
		content
	}
}
