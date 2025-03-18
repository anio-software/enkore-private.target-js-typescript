import ts from "typescript"
import type {MyTSModule} from "./MyTSModule.d.mts"
import type {MyTSCompilerOptions} from "./MyTSCompilerOptions.d.mts"

export type Internal = {
	cachedModules: Map<string, MyTSModule>

	tsCompilerHost: ts.CompilerHost
	tsCompilerOptions: ts.CompilerOptions
	tsProgram: ts.Program
	tsChecker: ts.TypeChecker

	getTSSourceFile: (filePath: string) => ts.SourceFile

	__self: MyTSProgram
}

export type MyTSProgram = {
	_myTSProgramBrand: any

	readonly projectRoot: string
	readonly compilerOptions: MyTSCompilerOptions

	getModule: (filePath: string) => MyTSModule
	getVirtualModule: (virtualFilePath: string) => MyTSModule

	readonly __internal: unknown
}
