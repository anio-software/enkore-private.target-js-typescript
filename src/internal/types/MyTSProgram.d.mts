import ts from "typescript"

export type MyTSProgram = {
	projectRoot: string
	tsCompilerHost: ts.CompilerHost
	tsCompilerOptions: ts.CompilerOptions
	tsProgram: ts.Program
	tsChecker: ts.TypeChecker
	getSourceFile: (filePath: string) => ts.SourceFile
}
