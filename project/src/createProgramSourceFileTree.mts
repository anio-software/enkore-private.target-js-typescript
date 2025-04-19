import ts from "typescript"
import {MyTSSourceFileDependencyTreeClass} from "./MyTSSourceFileDependencyTreeClass.mts"
import {getModuleImportAndExportSpecifiers} from "@aniojs/node-ts-utils"
import path from "node:path"

type Context = {
	projectRoot: string
	tsProgram: ts.Program
	processedSourceFiles: Map<string, MyTSSourceFileDependencyTreeClass>
}

function processSourceFile(
	context: Context,
	rootNode: MyTSSourceFileDependencyTreeClass,
	filePath: string
) {
	const tsSourceFile = context.tsProgram.getSourceFile(filePath)

	if (!tsSourceFile) {
		throw new Error(`Internal error, failed to get source file for path "${filePath}".`)
	}

	if (context.processedSourceFiles.has(filePath)) {
		return
	}

	const newRootNode = new MyTSSourceFileDependencyTreeClass(
		// filePath must start with projectRoot (established in createProgram.mts)
		filePath.slice(context.projectRoot.length)
	)

	rootNode.addChild(newRootNode)
	context.processedSourceFiles.set(filePath, newRootNode)

	const specifiers = getModuleImportAndExportSpecifiers(tsSourceFile)

	for (const specifier of specifiers) {
		if (!specifier.startsWith("./") && !specifier.startsWith("../")) {
			console.log("skipping specifier", specifier)
			continue
		}

		const resolvedSpecifier = path.join(
			path.dirname(filePath),
			specifier
		)

		processSourceFile(context, newRootNode, resolvedSpecifier)
	}
}

export function createProgramSourceFileTree(
	projectRoot: string,
	inputFilePaths: string[],
	tsProgram: ts.Program
): MyTSSourceFileDependencyTreeClass {
	const rootNode = new MyTSSourceFileDependencyTreeClass("__enkoreRootSourceFile")
	const context: Context = {
		projectRoot,
		tsProgram,
		processedSourceFiles: new Map()
	}

	for (const filePath of inputFilePaths) {
		processSourceFile(context, rootNode, filePath)
	}

	return rootNode
}
