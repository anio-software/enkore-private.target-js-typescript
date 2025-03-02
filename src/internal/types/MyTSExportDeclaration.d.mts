type Kind = "named" | "star"

type Export = {
	_myDeclarationType: "ExportDeclaration"
	_myDeclarationTSNode: unknown

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

export type MyTSExportDeclaration = NamedExport | StarExport
