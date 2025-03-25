import type {MyTSTopLevelTypeDescriptor} from "#~export/MyTSTopLevelTypeDescriptor.mts"

type Callback = (
	node: MyTSTopLevelTypeTreeClass,
	depth: number
) => boolean|void // <-- return type "boolean|undefined" does not work here

export class MyTSTopLevelTypeTreeClass {
	#type: MyTSTopLevelTypeDescriptor
	#children: MyTSTopLevelTypeTreeClass[]

	constructor(type: MyTSTopLevelTypeDescriptor) {
		this.#type = type
		this.#children = []
	}

	getType() {
		return this.#type
	}

	addChild(node: MyTSTopLevelTypeTreeClass) {
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
