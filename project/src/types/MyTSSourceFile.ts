import ts from "typescript"

import type {MyTSModule} from "./MyTSModule.mts"

export type Internal = {
	tsSourceFile: ts.SourceFile
	associatedModule: MyTSModule|undefined
}

// opaque representation of a typescript source file
export type MyTSSourceFile = {
	_myTSSourceFileBrand: any

	readonly code: string
	readonly __internal: unknown
}
