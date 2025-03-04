import type {MyTSExport} from "./MyTSExport.d.mts"
import type {MyTSTopLevelTypeNode} from "#~src/internal/MyTSTopLevelTypeNode.mts"

export type MyTSModule = {
	filePath: string

	readonly moduleExports: Map<string, MyTSExport>

	//
	// a tree of all top level types defined in the module
	//
	readonly rootTopLevelTypeNode: MyTSTopLevelTypeNode
}
