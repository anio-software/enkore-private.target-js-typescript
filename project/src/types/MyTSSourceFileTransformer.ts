import type {MyTSSourceFile} from "./MyTSSourceFile.ts"

export type MyTSSourceFileTransformer = (
	src: MyTSSourceFile
) => MyTSSourceFile
