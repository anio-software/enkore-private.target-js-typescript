import path from "node:path"

export function normalizePath(p: string) {
	let normalized = path.normalize(p)

	if (normalized.startsWith("/")) {
		normalized = normalized.slice(1)
	}

	return normalized
}
