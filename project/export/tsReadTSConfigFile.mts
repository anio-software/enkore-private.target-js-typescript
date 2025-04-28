import {
	readTSConfigFile as impl
} from "@aniojs/node-ts-utils"

import type {MyTSCompilerOptions} from "./MyTSCompilerOptions.mts"
import {createMyTSCompilerOptions} from "#~src/createMyTSCompilerOptions.mts"

export function tsReadTSConfigFile(
	projectRoot: string,
	configPath: string
): {
	tsconfig: any,
	compilerOptions: MyTSCompilerOptions
} {
	const {tsconfig, compilerOptions} = impl(
		projectRoot, configPath
	)

	return {
		tsconfig,
		compilerOptions: createMyTSCompilerOptions(compilerOptions)
	}
}
