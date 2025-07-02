export type MyTSDiagnosticMessage = {
	origin: {
		filePath?: string
		line?: number
		character?: number
	}

	code: number
	message: string
}
