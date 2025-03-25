import type {MyTSProgram} from "./MyTSProgram.mts"
import type {MyTSExport} from "./MyTSExport.mts"
import type {MyTSImportDeclaration} from "./node/MyTSImportDeclaration.mts"
import type {MyTSSourceFile} from "./MyTSSourceFile.mts"
import type {MyTSTopLevelTypeTree} from "#~export/MyTSTopLevelTypeTree.mts"

export type MyTSModule = {
	readonly filePath: string

	readonly program: MyTSProgram
	readonly source: MyTSSourceFile

	readonly moduleImports: Map<string, MyTSImportDeclaration>
	readonly moduleExports: Map<string, MyTSExport>

	readonly getModuleExportNames: () => string[]

	readonly getModuleExportByName: (
		exportName: string,
		considerTypesOnly?: boolean
	) => MyTSExport|undefined

	//
	// a tree of all top level types defined in the module
	//
	readonly rootTopLevelTypeNode: MyTSTopLevelTypeTree
}
