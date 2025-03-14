export type MyTSTopLevelType = {
	name: string
	declaration: string
	source: "module" | "import"

	//
	// an array representing what other types this type
	// depends on. if this array is empty, the type
	// is independent.
	//
	dependsOnTypes: string[]
}
