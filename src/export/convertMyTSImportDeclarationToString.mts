import type {MyTSImportDeclaration} from "./MyTSImportDeclaration.d.mts"
import {formatImportExportMembers} from "#~src/internal/utils/formatImportExportMembers.mts"

export function convertMyTSImportDeclarationToString(
	declaration: MyTSImportDeclaration
): string {
	const {kind, isTypeOnly, moduleSpecifier} = declaration
	const importStatement = isTypeOnly ? "import type " : "import "
	const from = ` from "${moduleSpecifier}"`

	if (kind === "star") {
		return `${importStatement}* as ${declaration.identifier}${from}`
	} else if (kind === "default") {
		return `${importStatement}${declaration.identifier}${from}`
	}

	return `${importStatement}${formatImportExportMembers(
		declaration.isTypeOnly,
		declaration.members
	)}${from}`
}
