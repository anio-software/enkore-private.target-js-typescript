import type {
	Internal as MyTSProgramInternal
} from "#~src/types/MyTSProgram.mts"

type DependencyGraph = MyTSProgramInternal["sourceDependencyGraph"]
type Visitor = (moduleSpecifier: string) => undefined

function dfs(
	graph: DependencyGraph,
	moduleSpecifier: string,
	visitor: Visitor,
	visited: Set<string>
) {
	if (visited.has(moduleSpecifier)) {
		return
	}

	visited.add(moduleSpecifier)
	visitor(moduleSpecifier)

	for (const neighbour of graph.get(moduleSpecifier) || []) {
		dfs(graph, neighbour, visitor, visited)
	}
}

export function walkSourceFileDependencyGraph(
	graph: DependencyGraph,
	absoluteFilePath: string,
	visitor: Visitor
) {
	dfs(graph, absoluteFilePath, visitor, new Set())
}
