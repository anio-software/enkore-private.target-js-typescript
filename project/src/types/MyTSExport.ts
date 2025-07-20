import type {MyTSVariableDeclaration} from "./node/MyTSVariableDeclaration.ts"
import type {MyTSFunctionDeclaration} from "./node/MyTSFunctionDeclaration.ts"
import type {MyTSTypeAliasDeclaration} from "./node/MyTSTypeAliasDeclaration.ts"

type Kind = "value" | "function" | "type" | "module" | "class" | "interface"

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

type ClassExport = Export & {
	kind: "class"
}

type InterfaceExport = Export & {
	kind: "interface"
}

export type MyTSExport = ValueExport | FunctionExport | TypeExport | ModuleExport | ClassExport | InterfaceExport
