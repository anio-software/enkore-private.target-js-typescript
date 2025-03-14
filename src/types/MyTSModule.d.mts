import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSExport} from "./MyTSExport.d.mts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.d.mts"
import type {MyTSSourceFile} from "./MyTSSourceFile.d.mts"
//import type {MyTSTopLevelTypeNode} from "#~src/internal/MyTSTopLevelTypeNode.mts"

export type MyTSModule = {
	readonly filePath: string

	readonly program: MyTSProgram
	readonly source: MyTSSourceFile

	readonly moduleImports: Map<string, MyTSImportDeclaration>
	readonly moduleExports: Map<string, MyTSExport>

	//
	// a tree of all top level types defined in the module
	//
	//readonly rootTopLevelTypeNode: MyTSTopLevelTypeNode
}
