type TypeDescriptorSource = "module" | "import"

type TypeDescriptor<
	Source extends TypeDescriptorSource,
	AdditionalData extends object = {}
> = {
	name: string
	declaration: string
	source: Source

	//
	// an array representing what other types this type
	// depends on. if this array is empty, the type
	// is independent.
	//
	dependsOnTypes: string[]
} & AdditionalData

export type MyTSTopLevelTypeDescriptor = TypeDescriptor<"module"> |
                                         TypeDescriptor<"import">
