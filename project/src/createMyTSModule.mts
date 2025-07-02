import type {MyTSProgram} from "./types/MyTSProgram.mts"
import type {MyTSModule} from "./types/MyTSModule.mts"
import type {MyTSSourceFile} from "./types/MyTSSourceFile.mts"
import {createMyTSSourceFile} from "./createMyTSSourceFile.mts"
import {getMyTSProgramInternals} from "./getMyTSProgramInternals.mts"
import {_getModuleExports} from "./moduleInit/_getModuleExports.mts"
import {_getModuleImportMap} from "./moduleInit/_getModuleImportMap.mts"
import {_getModuleTopLevelTypeMap} from "./moduleInit/_getModuleTopLevelTypeMap.mts"
import {_getModuleTopLevelType} from "./moduleInit/_getModuleTopLevelType.mts"
import {walkSourceFileDependencyGraph} from "#~src/walkSourceFileDependencyGraph.mts"

type Writeable<T> = {
	-readonly [P in keyof T]: T[P]
}

export function createMyTSModule(
	myProgram: MyTSProgram,
	filePath: string
): MyTSModule|undefined {
	const myProgramInt = getMyTSProgramInternals(myProgram)
	const tsSourceFile = myProgramInt.getTSSourceFile(filePath)

	// no such source file
	if (!tsSourceFile) {
		return undefined
	}

	// we know filePath starts with the project root here
	const relativeFilePath = filePath.slice(myProgram.projectRoot.length)

	const myModule: Writeable<MyTSModule> = {
		filePath: relativeFilePath,
		program: myProgram,
		moduleExports: new Map(),
		moduleImports: new Map(),
		topLevelTypesTree: {} as MyTSModule["topLevelTypesTree"],
		referencedModuleSpecifiers: new Set(),
		source: {} as MyTSSourceFile,
		getModuleExportNames: () => { return [] },
		getModuleExportByName: () => undefined
	}

	myModule.source = createMyTSSourceFile(tsSourceFile, myModule)

	myModule.moduleExports = _getModuleExports(
		tsSourceFile,
		myProgramInt.tsChecker,
		myModule.source
	)

	myModule.moduleImports = _getModuleImportMap(
		tsSourceFile, myModule.source
	)

	const typeMap = _getModuleTopLevelTypeMap(
		tsSourceFile, myProgramInt.tsChecker, myModule.moduleImports
	)

	myModule.topLevelTypesTree = _getModuleTopLevelType(
		typeMap
	)

	myModule.getModuleExportNames = () => {
		return [
			...myModule.moduleExports.entries()
		].map(([key]) => {
			return key
		})
	}

	myModule.getModuleExportByName = (exportName, considerTypesOnly) => {
		if (!myModule.moduleExports.has(exportName)) {
			return undefined
		}

		const exportDescriptor = myModule.moduleExports.get(exportName)!

		if (considerTypesOnly === true && exportDescriptor.kind !== "type") {
			return undefined
		}

		return exportDescriptor
	}

	walkSourceFileDependencyGraph(
		myProgramInt.sourceDependencyGraph,
		filePath,
		(moduleSpecifier) => {
			(myModule.referencedModuleSpecifiers as Set<string>).add(moduleSpecifier)
		}
	)

	return myModule
}
