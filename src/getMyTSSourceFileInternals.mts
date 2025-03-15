import type {
	MyTSSourceFile,
	Internal as MyTSSourceFileInternal
} from "#~src/types/MyTSSourceFile.d.mts"

export function getMyTSSourceFileInternals(
	source: MyTSSourceFile
): MyTSSourceFileInternal {
	return source.__internal as MyTSSourceFileInternal
}
