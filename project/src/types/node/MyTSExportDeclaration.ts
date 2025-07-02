import type {DefineNodeType} from "./DefineNodeType.ts"

type Kind = "named" | "star"

type Export = {
	kind: Kind
	isTypeOnly: boolean
}

export type NamedExportMember = {
	propertyName: string
	identifier: string
	isTypeOnly: boolean
}

export type NamedExport = Export & {
	kind: "named"
	moduleSpecifier: string|undefined
	members: NamedExportMember[]
}

export type StarExport = Export & {
	kind: "star"
	moduleSpecifier: string
}

export type MyTSExportDeclaration = DefineNodeType<
	"ExportDeclaration", NamedExport | StarExport
>
