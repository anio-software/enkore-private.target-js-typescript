import type {MyTSTopLevelType} from "#~src/export/MyTSTopLevelType.d.mts"

type Callback = (
	node: MyTSTopLevelTypeNode,
	depth: number
) => boolean|void // <-- return type "boolean|undefined" does not work here

export class MyTSTopLevelTypeNode {
	#type: MyTSTopLevelType
	#children: MyTSTopLevelTypeNode[]

	constructor(type: MyTSTopLevelType) {
		this.#type = type
		this.#children = []
	}

	getType() {
		return this.#type
	}

	addChild(node: MyTSTopLevelTypeNode) {
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
