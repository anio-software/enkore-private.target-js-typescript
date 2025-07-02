import ts from "typescript"

import type {MyTSModule} from "./MyTSModule.ts"

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
