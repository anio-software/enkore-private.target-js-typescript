import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.ts"
import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.ts"
import type {MyTSFunctionDeclaration} from "./MyTSFunctionDeclaration.ts"
import type {MyTSVariableDeclaration} from "./MyTSVariableDeclaration.ts"
import type {MyTSTypeAliasDeclaration} from "./MyTSTypeAliasDeclaration.ts"

import type {Kinds} from "./Kinds.ts"

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
