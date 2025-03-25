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

// credit to jcalz https://stackoverflow.com/a/67794430
type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never;

export type Map = {
	[Kind in Kinds]: DistributiveOmit<Extract<Nodes, {
		_myTSNode: {
			kind: Kind
		}
	}>, "_myTSNode">
}
