import type {MyTSTopLevelTypeDescriptor} from "#~src/export/MyTSTopLevelTypeDescriptor.d.mts"

type Callback = (
	node: MyTSTopLevelType,
	depth: number
) => boolean|void // <-- return type "boolean|undefined" does not work here

export class MyTSTopLevelType {
	#type: MyTSTopLevelTypeDescriptor
	#children: MyTSTopLevelType[]

	constructor(type: MyTSTopLevelTypeDescriptor) {
		this.#type = type
		this.#children = []
	}

	getType() {
		return this.#type
	}

	addChild(node: MyTSTopLevelType) {
		this.#children.push(node)
	}

	depthFirstTraversal(callback: Callback, __depth: number = -1) {
		const currentDepth = __depth + 1

		const recurse = callback(this, currentDepth) !== false

		if (!recurse) {
			return
		}

		for (const child of this.#children) {
			child.depthFirstTraversal(callback, currentDepth)
		}
	}
}
