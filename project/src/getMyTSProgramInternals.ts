import type {
	MyTSProgram,
	Internal as MyTSProgramInternal
} from "./types/MyTSProgram.ts"

export function getMyTSProgramInternals(
	myProgram: MyTSProgram
): MyTSProgramInternal {
	return myProgram.__internal as MyTSProgramInternal
}
