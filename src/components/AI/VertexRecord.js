class VertexRecord {
  constructor(v){
    this.setNode(v); // type Vertex
    this.setCost(0);
    this.setEstCost(0);
  }

  /**
     * Returns this record's Vertex
     * @return this record's vertex
     */
  getNode() {
    return this.node;
  }

  /**
     * Return's this record's edge
     * @return this record's edge
     */
  getConn() {
    return this.conn;
  }

  /**
     * Return's this record's cost so far
     * @return this record's cost so far
     */
  getCost() {
    return this.cost;
  }

  /**
     * Sets this record's node
     * @param node the node to set
     */
  setNode(node) {
    this.node = node; // node for this record
  }

  /**
     * Sets this record's connection
     * @param conn the Edge to set
     */
  setConn(conn) {
    this.conn = conn; // connection to least cost node
  }

  /**
     * Sets this record's cost
     * @param cost the cost to set
     */
  setCost(cost) {
    this.cost = cost; // cost so far
  }
    
  /**
     * Sets this record's parent
     * @param v the parent vertex to set
     */
  setParent(v){
    this.node.setParent(v);
  }

  /**
     * Returns the estimated cost
     * @return the estimated cost
     */
  getEstCost() {
    return this.estCost;
  }

  /**
     * Sets the estimated cost
     * @param estCost the estimated cost to set
     */
  setEstCost(estCost) {
    this.estCost = estCost; // estimated total cost
  }
}

module.exports = VertexRecord;
