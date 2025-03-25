import type {MyTSSourceFile} from "./MyTSSourceFile.mts"

export type MyTSSourceFileTransformer = (
	src: MyTSSourceFile
) => MyTSSourceFile
