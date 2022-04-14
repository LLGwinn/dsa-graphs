class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let item of vertexArray) {
      this.addVertex(item);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any 
  // adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) node.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stagingStack = [start];
    let seen = new Set([start]);
    let result = [];

    while (stagingStack.length) {
      let node = stagingStack.pop();
      result.push(node.value);

      for (let edge of node.adjacent) {
        if (!seen.has(edge)) {
          stagingStack.push(edge);
          seen.add(edge);
        }
      }
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let stagingQueue = [start];
    let seen = new Set([start]);
    let result = [];

    while (stagingQueue.length) {
      let node = stagingQueue.shift();
      result.push(node.value);

      for (let edge of node.adjacent) {
        if (!seen.has(edge)) {
          stagingQueue.push(edge);
          seen.add(edge);
        }
      }
    }
    return result;
  }
}

module.exports = {Graph, Node}