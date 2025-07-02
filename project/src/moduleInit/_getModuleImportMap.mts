import ts from "typescript"

import type {MyTSSourceFile} from "../types/MyTSSourceFile.mts"
import type {MyTSImportDeclaration} from "../types/node/MyTSImportDeclaration.mts"
import {convert} from "../convert/convert.mts"
import {astFilter} from "@anio-software/pkg.node-ts-utils"
import type {Nodes} from "../types/node/Map.mts"

export function _getModuleImportMap(
	sourceFile: ts.SourceFile,
	associatedSourceFile: MyTSSourceFile
): Map<string, MyTSImportDeclaration> {
	const map: Map<string, MyTSImportDeclaration> = new Map()

	const importDeclarations = astFilter(sourceFile, node => {
		return ts.isImportDeclaration(node)
	}).map(node => {
		return patch(convert(node))
	})

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
		} else if ("identifier" in importDeclaration) {
			map.set(importDeclaration.identifier, importDeclaration)
		}
	}

	return map

	function patch<Node extends Nodes>(myNode: Node): Node {
		;(myNode._myTSNode.associatedSourceFile as any) = associatedSourceFile;

		return myNode
	}
}
