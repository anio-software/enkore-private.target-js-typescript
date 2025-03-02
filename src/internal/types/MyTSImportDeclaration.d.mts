type Kind = "default" | "named" | "star"

type Import = {
	kind: Kind
	moduleSpecifier: string
	isTypeOnly: boolean
}

export type DefaultImport = Import & {
	kind: "default"
	identifier: string
}

export type NamedImportMember = {
	propertyName: string
	identifier: string
	isTypeOnly: boolean
}

export type NamedImport = Import & {
	kind: "named"
	members: NamedImportMember[]
}

export type StarImport = Import & {
	kind: "star"
	identifier: string
}

export type MyTSImportDeclaration = DefaultImport | NamedImport | StarImport
