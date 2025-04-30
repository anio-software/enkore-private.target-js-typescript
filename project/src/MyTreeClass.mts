type Callback<T> = (
	node: MyTreeClass<T>,
	depth: number
) => boolean|void // <-- return type "boolean|undefined" does not work here

export class MyTreeClass<T> {
	#data: T
	#children: MyTreeClass<T>[]

	constructor(data: T) {
		this.#data = data
		this.#children = []
	}

	findChild(test: (data: T) => boolean): MyTreeClass<T>|undefined {
		let result: MyTreeClass<T>|undefined = undefined

		this.depthFirstTraversal((node) => {
			if (test(node.getData()) === true) {
				result = node

				// stop the traversal here
				return false
			}
		})

		return result
	}

	convertToArray(): T[] {
		const result: T[] = []

		this.depthFirstTraversal(node => {
			result.push(node.getData())
		})

		return result
	}

	getData() {
		return this.#data
	}

	addChild(node: MyTreeClass<T>) {
		this.#children.push(node)
	}

	depthFirstTraversal(callback: Callback<T>, __depth: number = -1) {
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
