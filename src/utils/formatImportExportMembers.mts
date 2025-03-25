import type {NamedImportMember} from "../types/node/MyTSImportDeclaration.mts"
import type {NamedExportMember} from "../types/node/MyTSExportDeclaration.mts"

export function formatImportExportMembers(
	declarationIsTypeOnly: boolean,
	members: (NamedExportMember|NamedImportMember)[]
): string {
	if (!members.length) {
		throw new Error(`Cannot have empty named import/export.`)
	}

	let ret = `{`

	if (members.length > 1) ret += `\n`

	for (const member of members) {
		if (declarationIsTypeOnly && !member.isTypeOnly) {
			throw new Error(`Cannot have a value import in a type-only import.`)
		}

		let useTypeKeyword = !declarationIsTypeOnly && member.isTypeOnly
		let useAlias = member.propertyName !== member.identifier

		let tmp1 = useTypeKeyword ? `type ` : ``
		let tmp2 = useAlias ? `${member.propertyName} as ${member.identifier}` : member.propertyName

		ret += (members.length > 1 ? "\t" : "") + `${tmp1}${tmp2},\n`
	}

	// remove trailing comma
	ret = ret.slice(0, -2)

	if (members.length > 1) ret += `\n`

	ret += `}`

	return ret
}
