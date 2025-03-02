import type {NamedImportMember} from "#~src/internal/types/MyTSImportDeclaration.d.mts"
import type {NamedExportMember} from "#~src/internal/types/MyTSExportDeclaration.d.mts"

export function formatImportExportMembers(
	declarationIsTypeOnly: boolean,
	members: (NamedExportMember|NamedImportMember)[]
): string {
	if (!members.length) {
		throw new Error(`Cannot have empty named import/export.`)
	}

	let ret = `{\n`

	for (const member of members) {
		if (declarationIsTypeOnly && !member.isTypeOnly) {
			throw new Error(`Cannot have a value import in a type-only import.`)
		}

		let useTypeKeyword = !declarationIsTypeOnly && member.isTypeOnly
		let useAlias = member.propertyName !== member.identifier

		let tmp1 = useTypeKeyword ? `type ` : ``
		let tmp2 = useAlias ? `${member.propertyName} as ${member.identifier}` : member.propertyName

		ret += `\t${tmp1}${tmp2},\n`
	}

	// remove trailing comma
	ret = ret.slice(0, -2) + "\n"

	ret += `}`

	return ret
}
