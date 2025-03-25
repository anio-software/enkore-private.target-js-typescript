import type {
	MyTSCompilerOptions,
	Internal as MyTSCompilerOptionsInternal
} from "./types/MyTSCompilerOptions.mts"

export function getMyTSCompilerOptionsInternals(
	myCompilerOptions: MyTSCompilerOptions
): MyTSCompilerOptionsInternal {
	return myCompilerOptions.__internal as MyTSCompilerOptionsInternal
}
