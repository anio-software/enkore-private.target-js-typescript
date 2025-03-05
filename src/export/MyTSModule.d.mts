import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSExport} from "./MyTSExport.d.mts"
import type {MyTSTopLevelTypeNode} from "#~src/internal/MyTSTopLevelTypeNode.mts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.d.mts"

export type MyTSModule = {
	filePath: string

	readonly program: MyTSProgram

	readonly moduleImports: Map<string, MyTSImportDeclaration>
	readonly moduleExports: Map<string, MyTSExport>

	//
	// a tree of all top level types defined in the module
	//
	readonly rootTopLevelTypeNode: MyTSTopLevelTypeNode
}
