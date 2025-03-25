import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.mts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.mts"
import type {MyTSFunctionDeclaration} from "./MyTSFunctionDeclaration.mts"
import type {MyTSVariableDeclaration} from "./MyTSVariableDeclaration.mts"
import type {MyTSTypeAliasDeclaration} from "./MyTSTypeAliasDeclaration.mts"

import type {Kinds} from "./Kinds.mts"

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
