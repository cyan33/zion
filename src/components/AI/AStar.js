const VertexRecord = require('./VertexRecord');
const { getDistance } = require('../../utils')();

/** the type of heuristic to use */
const HEUR_TYPE = 0;

class AStar {
  constructor(){
    this.total_open = 0;
    this.total_closed = 0;
  }
    
  /**
     * Finds the shortest path from an initial position to a target using A* search.
     * If no valid path is found, returns null. Defaults to manhattan heuristic, but can also
     * be switched to Euclidean if desired
     * @param graph the room graph by which to path find (Vertex list)
     * @param start the starting vertex (Vertex)
     * @param end the vertex at which to end (Vertex)
     * @returns the smallest valid path to the end target, null otherwise
     */
  AStarPathfind(graph, start, end){
    // Establish open and closed lists (may want to change to priority queue implementation
    let open = []; // VertexRecord list
    let closed = []; // VertexRecord list
    let next = new VertexRecord(start); // VertexRecord
    next.setEstCost(this.useHeuristic(start, end));
    open.push(next); // Get the initial vertex
    let current = null; // VertexRecord
		
    while(open.length > 0){
      // Get the smallest edge record in the open list
      current = this.getSmallest(open);
      // Break if we are at the goal node
      if(current.getNode().equals(end)) break;
      // Get connections for this node
      let neighbors = current.getNode().getNeighbors();
      // Loop through node's neighbors
      for(let i = 0; i < neighbors.length; i++){
        let n = neighbors[i];
        let endNode = n.getNeighbor(); // Vertex
        let endCost = current.getCost() + n.getWeight();
        let endHeuristic = 0.0;
				
        // Check if on the closed list
        let endRecord = this.listContains(closed, endNode); // VertexRecord
        if(endRecord != null){
          // Continue if record_cost <= endCost
          if(endRecord.getCost() <= endCost) continue;
          // Otherwise remove from close list
          closed.splice(closed.indexOf(endRecord), 1); // remove at index
          // Use this node's old cost value to calculate heuristic
          // endNodeHeuristic = endNodeRecord.cost - endNodeRecord.costSoFar?
          endHeuristic = endRecord.getConn().getWeight() - endRecord.getCost();
        }
				
        // Check if on the open list
        endRecord = this.listContains(open, endNode);
        if(endRecord != null){
          if(endRecord.getCost() <= endCost) continue;
          // Use this node's old cost value to calculate heuristic
          // endNodeHeuristic = endNodeRecord.cost - endNodeRecord.costSoFar? (Problems)?
          endHeuristic = endRecord.getConn().getWeight() - endRecord.getCost();
        } else {
          // Else we have an unvisited node, so make a new record
          endRecord = new VertexRecord(endNode);
          endHeuristic = this.useHeuristic(endNode, end);
        }
				
        // Update connection and cost
        endRecord.setCost(endCost);
        endRecord.setConn(n);
        // Update parent of this node in the graph
        let index = graph.indexOf(endNode);
        endNode = graph[index];
        endNode.setParent(endRecord.getConn().getOrigin());
        graph.splice(index, 1, endNode);
        // Update estimated total
        endRecord.setEstCost(endCost + endHeuristic);
				
        // Then add to the open list
        if(open.indexOf(endRecord) === -1) open.push(endRecord);
      }
			
      // Finished this node, so remove from open
      open.splice(open.indexOf(current), 1);
      // And add it to closed
      closed.push(current);
    }
		
    // Out of nodes so check for goal
    if(!current.getNode().equals(end)) return null;
		
    // Otherwise compile path connections
    let path = []; // Vertex list
    let prev = current.getNode(); // Vertex
    while(!prev.equals(start)){
      // Add the node to the path
      path.push(prev);
      // Update to the next connection
      prev = graph[graph.indexOf(prev)].getParent();
    }
		
    // Update total closed and open nodes
    this.total_open += open.length;
    this.total_closed += closed.length;
		
    // Return reversed path
    path = path.reverse();
    return path;
  }
	
  /**
	 * Returns the VertexRecord with the smallest total estimated cost so far
	 * @param open the open list used in A* pathfinding (VertexRecord list)
	 * @return the VertexRecord with the smallest estimated total cost
	 */
  getSmallest(open){
    // If only one element, return it
    if(open.length == 1) return open[0];
		
    // Smallest edge
    let smallest = open[0]; // VertexRecord
		
    // Search through the graph for the smallest estimated cost
    for(let i = 0; i < open.length; i++){
      if(open[i].getEstCost() < smallest.getEstCost()){
        smallest = open[i];
      }
    }
    // Return smallest edge
    return smallest;
  }
	
  /**
	 * Returns a vertex in the given list of records corresponding to the vertex 
     * to search, null otherwise.
	 * @param list the list for the element to search (VertexRecord list)
	 * @param v the vertex to search (Vertex)
	 * @return the vertex to search in the specified list, null otherwise
	 */
  listContains(list, v){
    for(let i = 0; i < list.length; i++){
      // Check if node exists on list
      if(list[i].getNode().equals(v)) return list[i];
    }
    return null;
  }
	
  /**
	 * Determines the heuristic to use in calculating estimated cost
	 * @param from starting vertex (Vertex)
     * @param end ending vertex (Vertex)
     * @return heuristic-specific distance calculation
	 */
  useHeuristic(from, end){
    switch(HEUR_TYPE){
    case 0:
      return this.manhattanHeuristic(from, end);
    default:
      return this.euclidean(from, end);
    }		
  }
	
  /**
	 * Manhattan distance heuristic used in calculating A* pathfinding.
	 * Good for avoiding performance issues for indoor environments.
	 * @param from node from which to calculate distance to goal (Vertex)
	 * @param end goal node to which to calculate the distance (Vertex)
	 * @return estimated cost from start to goal node
	 */
  manhattanHeuristic(from, end){
    // Returns sum of respective difference in x and y components
    // return Math.Abs(a.X - b.X) + Math.Abs(a.Y - b.Y);
    return Math.abs(from.getLoc().x - end.getLoc().x) + Math.abs(from.getLoc().y - end.getLoc().y);
  }
	
  /**
	 * Euclidean heuristic for A* pathfinding. This is guaranteed to be either accurate or underestimating.
	 * @param from node from which to calculate distance to goal (Vertex)
	 * @param end goal node to which to calculate the distance (Vertex)
	 * @return estimated cost from start to goal node
	 */
  euclidean(from, end){
    return getDistance(from.getLoc().x, from.getLoc().y, end.getLoc().x, end.getLoc().y);
  }
	
  /**
	 * Gets the average memory stats for this run
     * Used for testing purposes.
	 * @param n the number of nodes in the graph
	 */
  displayMemoryAvgs(n){
    let avgOpen = this.total_open / n;
    let avgMemory = (this.total_open + this.total_closed) / n;
    return {avgOpen, avgMemory};
  }
	
  resetStats(){
    this.total_open = 0;
    this.total_closed = 0;
  }
}
module.exports = AStar;
