import type {MyTSProgram} from "./MyTSProgram.ts"
import type {MyTSExport} from "./MyTSExport.ts"
import type {MyTSImportDeclaration} from "./node/MyTSImportDeclaration.ts"
import type {MyTSSourceFile} from "./MyTSSourceFile.ts"
import type {MyTSTopLevelTypeTree} from "#~export/MyTSTopLevelTypeTree.ts"

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
	readonly topLevelTypesTree: MyTSTopLevelTypeTree

	readonly referencedModuleSpecifiers: ReadonlySet<string>
}
