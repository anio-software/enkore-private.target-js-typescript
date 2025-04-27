import type {MyTSVariableDeclaration} from "./node/MyTSVariableDeclaration.mts"
import type {MyTSFunctionDeclaration} from "./node/MyTSFunctionDeclaration.mts"
import type {MyTSTypeAliasDeclaration} from "./node/MyTSTypeAliasDeclaration.mts"

type Kind = "value" | "function" | "type" | "module"

type Export = {
	kind: Kind
}

type ValueExport = Export & {
	kind: "value"
	declaration: MyTSVariableDeclaration
}

type FunctionExport = Export & {
	kind: "function"
	declarations: MyTSFunctionDeclaration[]
}

type TypeExport = Export & {
	kind: "type"
	declaration: MyTSTypeAliasDeclaration
}

type ModuleExport = Export & {
	kind: "module"
}

export type MyTSExport = ValueExport | FunctionExport | TypeExport | ModuleExport
