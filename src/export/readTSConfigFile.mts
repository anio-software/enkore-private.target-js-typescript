import {
	readTSConfigFile as impl
} from "@aniojs/node-ts-utils"

export function readTSConfigFile(
	projectRoot: string,
	configPath: string
): {
	tsconfig: any,
	compilerOptions: any
} {
	return impl(
		projectRoot, configPath
	)
}
