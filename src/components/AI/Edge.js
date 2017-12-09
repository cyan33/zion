class Edge {
  constructor(o, n, w){
    this.origin = o; // "from" vertex
    this.neighbor = n; // "to" vertex
    this.weight = w; // edge weight
  }

  /**
     * Returns this edge's neighbor
     * @return this edge's neighbor
     */
  getNeighbor() {
    return this.neighbor;
  }

  /**
     * Returns this edge's weight
     * @return this edge's weight
     */
  getWeight() {
    return this.weight;
  }
    
  /**
     * Returns this edge's origin
     * @return this edge's origin
     */
  getOrigin(){
    return this.origin;
  }
}

module.exports = Edge;
