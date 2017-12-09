class Path {
  constructor(){
    this.radius = 10; // path to follow
    this.points = []; // radius from which a player can stray from the path (list of Vectors)
  }
	
  /**
	 * Returns this path
     * @return this path
	 */
  getPath(){
    return this.points;
  }
	
  /**
	 * Add a point to the path
     * @param p the point (vector) to add
	 */
  add(p){
    this.points.push(p);
  }
}

module.exports = Path;
