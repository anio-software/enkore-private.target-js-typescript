import ts from "typescript"

export function createSourceDependencyGraph(
	projectRoot: string,
	inputFilePaths: string[],
	program: ts.Program
): Map<string, Set<string>> {
	return new Map()
}
