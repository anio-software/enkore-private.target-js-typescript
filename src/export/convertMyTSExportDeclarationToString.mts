import type {MyTSExportDeclaration} from "./MyTSExportDeclaration.d.mts"
import {formatImportExportMembers} from "#~src/internal/utils/formatImportExportMembers.mts"

export function convertMyTSExportDeclarationToString(
	declaration: MyTSExportDeclaration
): string {
	const {kind, isTypeOnly, moduleSpecifier} = declaration
	const exportStatement = isTypeOnly ? "export type " : "export "
	const from = ` from "${moduleSpecifier}"`

	if (kind === "star") {
		return `${exportStatement}*${from}`
	}

	return `${exportStatement}${formatImportExportMembers(
		declaration.isTypeOnly,
		declaration.members
	)}${from}`
}
