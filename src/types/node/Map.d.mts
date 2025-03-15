import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.d.mts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.d.mts"
import type {MyTSFunctionDeclaration} from "./MyTSFunctionDeclaration.d.mts"
import type {MyTSVariableDeclaration} from "./MyTSVariableDeclaration.d.mts"
import type {MyTSTypeAliasDeclaration} from "./MyTSTypeAliasDeclaration.d.mts"

import type {Kinds} from "./Kinds.d.mts"

export type Nodes = MyTSExportDeclaration   |
                    MyTSImportDeclaration   |
                    MyTSFunctionDeclaration |
                    MyTSVariableDeclaration |
                    MyTSTypeAliasDeclaration

export type Map = {
	[Kind in Kinds]: Extract<Nodes, {
		_myTSNode: {
			kind: Kind
		}
	}>
}
