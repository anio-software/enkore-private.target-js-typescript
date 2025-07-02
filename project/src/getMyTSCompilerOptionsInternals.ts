import type {
	MyTSCompilerOptions,
	Internal as MyTSCompilerOptionsInternal
} from "./types/MyTSCompilerOptions.ts"

export function getMyTSCompilerOptionsInternals(
	myCompilerOptions: MyTSCompilerOptions
): MyTSCompilerOptionsInternal {
	return myCompilerOptions.__internal as MyTSCompilerOptionsInternal
}
