import type {MyTSProgram} from "#~src/export/MyTSProgram.d.mts"
import type {MyTSImportDeclaration} from "#~src/export/MyTSImportDeclaration.d.mts"
import {getModuleImportDeclarations} from "#~src/export/getModuleImportDeclarations.mts"

export function getModuleImportMap(
	myProgram: MyTSProgram,
	filePath: string
): Map<string, MyTSImportDeclaration> {
	const map: Map<string, MyTSImportDeclaration> = new Map()

	const importDeclarations = getModuleImportDeclarations(myProgram, filePath)

	for (const importDeclaration of importDeclarations) {
		//
		// flatten named imports into multiple single named imports
		//
		if (importDeclaration.kind === "named") {
			for (const member of importDeclaration.members) {
				map.set(
					member.identifier, {
						...importDeclaration,
						isTypeOnly: member.isTypeOnly,
						members: [member]
					}
				)
			}
		} else {
			map.set(importDeclaration.identifier, importDeclaration)
		}
	}

	return map
}
