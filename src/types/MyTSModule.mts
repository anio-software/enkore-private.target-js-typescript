import type {MyTSProgram} from "./MyTSProgram.d.mts"
import type {MyTSExport} from "./MyTSExport.d.mts"
import type {MyTSImportDeclaration} from "./node/MyTSImportDeclaration.d.mts"
import type {MyTSSourceFile} from "./MyTSSourceFile.d.mts"
import type {MyTSTopLevelTypeTree} from "#~src/export/MyTSTopLevelTypeTree.mts"

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
