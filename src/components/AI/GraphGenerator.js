const Vertex = require('./Vertex');
const {calculateCenter, getDistance} = require('../operations');

class GraphGenerator {
  constructor(){
    this.points = []; // List of Vertices representing the room path
  }

  /** 
	 * Generates a graph of vertices based on the given grid structure.
	 * @param grid the grid from which to generate the room graph
	 * @param cellWidth the width of a grid cell
	 * @param cellHeight the height of a grid cell
	 */
  generateGraphFromGridCells(grid, cellWidth, cellHeight) {
    // Examine each cell and create initial verticies
    for(let i = 0; i < grid.length; i++) {
      let vertex = new Vertex(i);
      let x = cellWidth * grid[i].gridPosition.c;
      let y = cellHeight * grid[i].gridPosition.r;
      let center = calculateCenter(x, y, cellWidth, cellHeight);
      vertex.setLoc({x: center.x, y: center.y});
      this.points.push(vertex);
    }
    // Add neighbors for each vertex
    for(let i = 0; i < grid.length; i++) {
      let vertex = this.points[i];
      let neighbors = grid[i].neighbors;
      for(let j = 0; j < neighbors.length; j++) {
        let neighbor = this.points[neighbors[j]];
        let distance = getDistance(vertex.getLoc().x, vertex.getLoc().y, neighbor.getLoc().x, neighbor.getLoc().y);
        // Add this neighbor to the current vertex
        vertex.addNeighbor(neighbor, distance);
      }
      // Update the vertex in the graph
      this.points[i] = vertex;
    }
  }
	
  /**
	 * Returns the Vertex array representing the graph of nodes for this graph
	 * @return the vertex array representing this graph
	 */
  getGraph(){
    return this.points;
  }
}

module.exports = GraphGenerator;
