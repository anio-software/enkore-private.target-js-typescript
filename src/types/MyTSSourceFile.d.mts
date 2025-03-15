import ts from "typescript"

import type {MyTSModule} from "./MyTSModule.d.mts"

export type Internal = {
	sourceFile: ts.SourceFile
	associatedModule: MyTSModule|undefined
}

// opaque representation of a typescript source file
export type MyTSSourceFile = {
	readonly __internal: unknown
}
