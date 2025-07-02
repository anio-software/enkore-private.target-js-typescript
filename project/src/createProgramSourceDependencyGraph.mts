import ts from "typescript"
import path from "node:path"
import {getModuleImportAndExportSpecifiers} from "@aniojs/node-ts-utils"

type Context = {
	tsProgram: ts.Program
	projectRoot: string
	visited: Set<string>
	graph: Map<string, Set<string>>
}

function processSourceFile(context: Context, filePath: string) {
	const {tsProgram, visited, graph} = context

	if (visited.has(filePath)) {
		return
	}

	visited.add(filePath)

	if (!graph.has(filePath)) {
		graph.set(filePath, new Set())
	}

	const tsSourceFile = tsProgram.getSourceFile(filePath)

	if (!tsSourceFile) {
		throw new Error(`Internal error, failed to get source file for path "${filePath}".`)
	}

	const specifiers = getModuleImportAndExportSpecifiers(tsSourceFile)

	for (const specifier of specifiers) {
		if (specifier.startsWith("./") || specifier.startsWith("../")) {
			const resolvedSpecifier = path.join(
				path.dirname(filePath),
				specifier
			)

			graph.get(filePath)!.add(resolvedSpecifier)

			processSourceFile(context, resolvedSpecifier)
		} else {
			graph.get(filePath)!.add(`external:${specifier}`)
		}
	}
}

export function createProgramSourceDependencyGraph(
	projectRoot: string,
	inputFilePaths: string[],
	tsProgram: ts.Program
): Map<string, Set<string>> {
	const context: Context = {
		tsProgram,
		projectRoot,
		visited: new Set(),
		graph: new Map()
	}

	for (const inputFilePath of inputFilePaths) {
		processSourceFile(context, inputFilePath)
	}

	return context.graph
}
