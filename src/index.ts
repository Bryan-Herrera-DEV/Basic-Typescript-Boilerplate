// basic graph implementation
class Vertex<T> {
  constructor(public value: T) {}
}

class Graph<T> {
  private vertices: Map<T, Vertex<T>> = new Map();
  private edges: Map<T, Vertex<T>[]> = new Map();

  addVertex(value: T): void {
    if (this.vertices.has(value)) {
      throw new Error(`Vertex ${value} already exists.`);
    }
    this.vertices.set(value, new Vertex(value));
    this.edges.set(value, []);
  }

  addEdge(value1: T, value2: T): void {
    const vertex1 = this.vertices.get(value1);
    const vertex2 = this.vertices.get(value2);

    if (!vertex1 || !vertex2) {
      throw new Error(`One or both vertices do not exist - Vertex1: ${value1}, Vertex2: ${value2}`);
    }

    this.edges.get(value1)?.push(vertex2);
    this.edges.get(value2)?.push(vertex1);
  }

  dfs(startValue: T): T[] {
    const startVertex = this.vertices.get(startValue);

    if (!startVertex) {
      throw new Error(`Start vertex ${startValue} does not exist.`);
    }

    const visitedVertices = new Set<Vertex<T>>();
    const dfsRecursive = (vertex: Vertex<T>): T[] => {
      visitedVertices.add(vertex);

      const neighbors = this.edges.get(vertex.value)?.filter(neighbor => !visitedVertices.has(neighbor)) || [];

      let path = [vertex.value];
      for (const neighbor of neighbors) {
        path = path.concat(dfsRecursive(neighbor));
      }

      return path;
    };

    return dfsRecursive(startVertex);
  }
}

// Use case
const graph = new Graph<number>();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
console.log(graph.dfs(1)); // Return: [1, 2, 3]
