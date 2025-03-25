import type {MyTSSourceFile} from "./MyTSSourceFile.d.mts"

export type MyTSSourceFileTransformer = (
	src: MyTSSourceFile
) => MyTSSourceFile
