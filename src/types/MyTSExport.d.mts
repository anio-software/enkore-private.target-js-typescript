import type {MyTSVariableDeclaration} from "./node/MyTSVariableDeclaration.d.mts"
import type {MyTSFunctionDeclaration} from "./node/MyTSFunctionDeclaration.d.mts"
import type {MyTSTypeAliasDeclaration} from "./node/MyTSTypeAliasDeclaration.d.mts"

type Kind = "value" | "function" | "type"

type Export = {
	kind: Kind
}

type ValueExport = Export & {
	kind: "value"
	declaration: MyTSVariableDeclaration
}

type FunctionExport = Export & {
	kind: "function"
	identifier: string
	declarations: MyTSFunctionDeclaration[]
}

type TypeExport = Export & {
	kind: "type"
	declaration: MyTSTypeAliasDeclaration
}

export type MyTSExport = ValueExport | FunctionExport | TypeExport
