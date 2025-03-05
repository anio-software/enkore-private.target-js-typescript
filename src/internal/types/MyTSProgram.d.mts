import ts from "typescript"
import type {MyTSModule} from "#~src/export/MyTSModule.d.mts"

export type Internal = {
	cachedModules: Map<string, MyTSModule>
	__self: MyTSProgram
}

export type MyTSProgram = {
	projectRoot: string
	tsCompilerHost: ts.CompilerHost
	tsCompilerOptions: ts.CompilerOptions
	tsProgram: ts.Program
	tsChecker: ts.TypeChecker
	getSourceFile: (filePath: string) => ts.SourceFile
	getModule: (filePath: string) => MyTSModule

	__internal: unknown
}
