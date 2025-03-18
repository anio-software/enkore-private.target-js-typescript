import ts from "typescript"
import type {
	MyTSCompilerOptions,
	Internal as MyTSCompilerOptionsInternal
} from "./types/MyTSCompilerOptions.d.mts"

export function createMyTSCompilerOptions(
	compilerOptions: ts.CompilerOptions
): MyTSCompilerOptions {
	const __internal: MyTSCompilerOptionsInternal = {
		tsCompilerOptions: compilerOptions
	}

	return {
		_myTSCompilerOptionsBrand: undefined,
		__internal
	}
}
