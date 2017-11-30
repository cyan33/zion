class GraphGenerator {
  constructor(points, obstacles, bounds){
    this.points = points; // List of Vertices representing the room path
    this.obstacles = obstacles; // list of obstacles in room
    this.roomBounds = bounds; // boundaries for room
  }
	
  /**
	 * Returns the Vertex array representing the graph of nodes for this graph
	 * @return the vertex array representing this graph
	 */
  getGraph(){
    return this.points;
  }

  /**
	 * Returns the list of obstacles for this graph
	 * @return the list of obstacles for this graph
	 */
  getObstacles() {
    return this.obstacles;
  }
	
  /** 
	 * Returns the room boundaries for this room
	 * @return the room boundaries for this room
	 */
  getBoundaries(){
    return this.roomBounds;
  }
}

module.exports = GraphGenerator;