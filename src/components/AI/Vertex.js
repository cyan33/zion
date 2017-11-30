const Edge = require('./Edge');

class Vertex {
  constructor(val){
    this.value = val; // vertex value
    this.neighbors = []; // vertex neighbors of type Edge
    this.parent = null; // parent vertex in shortest path
    this.loc = null; // world location
    this.filled = false; // was the node filled in during pathfinding?
  }
    
  /**
 * Adds a neighbor to this Vertex's edge list
    * @param v the vertex to add
    * @param dist the edge weight between these vertices
    */
  addNeighbor(v, dist){
    if(!this.checkInNeighbors(v)){
      this.neighbors.add(new Edge(this, v, dist));
    }
    return false;
  }
    
  /**
     * Checks if the vertex to add is already a neighbor
     * @param v the vertex to check 
     * @return if the vertex to add is already a neighbor
     */
  checkInNeighbors(v){
    // Don't add yourself (edge case)
    if(v.getValue() == this.value){
      return true;
    }
    for(let i = 0; i < this.neighbors.length; i++){
      // Test if the vertex to add is already at this position
      if(this.neighbors[i].getNeighbor().equals(v)){
        return true;
      }
    }
    return false;
  }
    
  /**
     * Tests if this Vertex and the given object are equal.
     * @param o the object to test
     * @return if this vertex and the object are equal
     */
  equals(o){
    if(o instanceof Vertex) {
      if(o.getValue() == this.value){
        return true;
      }
    }
    return false;
  }
    
  /**
     * Gets the value for this vertex
     * @return this vertex's value
     */
  getValue(){
    return this.value;
  }
    
  /**
     * Gets this vertex's neighbors
     * @return this vertex's neighbors
     */
  getNeighbors(){
    return this.neighbors;
  }
    
  /**
     * Sets this vertex's parent
     * @param v the parent vertex to set
     */
  setParent(v){
    this.parent = v;
  }
    
  /**
     * Gets the parent for this vertex
     * @return this vertex's parent
     */
  getParent(){
    return this.parent;
  }
    
  /**
     * String representation for this vertex
     * @return string representation for this vertex
     */
  toString(){
    let disp = 'Vertex ' + this.value + ' - Neighbors: [';
    for(let e in this.neighbors){
      disp += 'Vertex: ' + e.getNeighbor().getValue() + ', Weight = ' + e.getWeight() + '; ';
    }
    disp += ']';
    return disp;
  }
    
  /**
    * Gets this vertex's location
    * @return this vertex's location (PVector)
    */
  getLoc() {
    return this.loc;
  }

  /**
    * Sets this vertex's location
    * @param loc the location to set (PVector)
    */
  setLoc(loc) {
    this.loc = loc;
  }

  /**
    * Returns if this vertex is filled
    * @return if this vertex is filled
    */
  isFilled() {
    return this.filled;
  }

  /**
    * Sets the filled status for this vertex
    * @param filled the filled status to set 
    */
  setFilled(filled) {
    this.filled = filled;
  }
}

export default Vertex;