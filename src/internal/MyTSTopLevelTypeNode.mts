import type {MyTSTopLevelType} from "#~src/export/MyTSTopLevelType.d.mts"

type Callback = (type: MyTSTopLevelType, depth: number) => undefined

export class MyTSTopLevelTypeNode {
	#type: MyTSTopLevelType
	#children: MyTSTopLevelTypeNode[]

	constructor(type: MyTSTopLevelType) {
		this.#type = type
		this.#children = []
	}

	addChild(node: MyTSTopLevelTypeNode) {
		this.#children.push(node)
	}

	depthFirstTraversal(callback: Callback, __depth: number = -1) {
		const currentDepth = __depth + 1

		callback(this.#type, currentDepth)

		for (const child of this.#children) {
			child.depthFirstTraversal(callback, currentDepth)
		}
	}
}
