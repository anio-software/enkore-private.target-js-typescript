import ts from "typescript"

export function readTSConfigFile(
	projectRoot: string,
	tsconfigPath: string
) {
	// Don't use JSON.parse to parse the config file
	// because TypeScript configs are allowed to have
	// comments in them.
	const tsconfig = ts.readConfigFile(
		tsconfigPath, ts.sys.readFile
	).config

	const {errors, options} = ts.convertCompilerOptionsFromJson(
		tsconfig.compilerOptions, projectRoot
	)

	if (errors.length) {
		throw new Error(
			`Failed to load '${tsconfigPath}': \n    • ` +
			errors.map(({messageText}) => messageText).join("\n    • ")
		)
	}

	return {
		tsconfig,
		compilerOptions: options
	}
}
