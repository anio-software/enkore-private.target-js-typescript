import ts from "typescript"
import type {MyTSModule} from "./MyTSModule.mts"
import type {MyTSCompilerOptions} from "./MyTSCompilerOptions.mts"
import {MyTSSourceFileDependencyTreeClass} from "#~src/MyTSSourceFileDependencyTreeClass.mts"

export type Internal = {
	cachedModules: Map<string, MyTSModule>

	tsCompilerHost: ts.CompilerHost
	tsCompilerOptions: ts.CompilerOptions
	tsProgram: ts.Program
	tsChecker: ts.TypeChecker

	getTSSourceFile: (filePath: string) => ts.SourceFile|undefined

	// to be removed ...
	sourceFileTree: MyTSSourceFileDependencyTreeClass

	sourceDependencyGraph: Map<string, Set<string>>

	__self: MyTSProgram
}

export type MyTSProgram = {
	_myTSProgramBrand: any

	readonly projectRoot: string
	readonly compilerOptions: MyTSCompilerOptions

	getModule: (filePath: string) => MyTSModule|undefined
	getVirtualModule: (virtualFilePath: string) => MyTSModule|undefined

	readonly __internal: unknown
}
