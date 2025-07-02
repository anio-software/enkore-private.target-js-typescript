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
	if (context.visited.has(filePath)) return
	context.visited.add(filePath)

	if (!context.graph.has(filePath)) {
		context.graph.set(filePath, new Set())
	}

	const tsSourceFile = context.tsProgram.getSourceFile(filePath)

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

			context.graph.get(filePath)!.add(resolvedSpecifier)

			processSourceFile(context, resolvedSpecifier)
		} else {
			context.graph.get(filePath)!.add(specifier)
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
