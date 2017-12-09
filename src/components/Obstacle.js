/**
 * @author jegood
 */
const Sprite = require('./Sprite');
const { getDistance, calculateCenter } = require('../utils')();
const NUM_SECTIONS = 9;

class Obstacle extends Sprite {
  constructor(src, size, { x, y }) {
    super(src, size, { x, y });
    this.calculateBoundaries();
  }

  // subdivides this obstacle into boundaries for collision detection
  calculateBoundaries() {
    this.boundaries = new Array();
    let sections_rc = Math.sqrt(NUM_SECTIONS);
    let width = this.size / sections_rc;
    let x = this.position.x, y = this.position.y;
    // Define boundaries based on number of sections
    for(let i = 0; i < sections_rc; i++) {
      for(let j = 0; j < sections_rc; j++) {
        this.boundaries.push(calculateCenter(x, y, width));
        x += width;
      }
      x = this.position.x;
      y += width;
    }
  }

  // Gets the collision for this obstacle and the given object
  getCollision(objX, objY, prox, boundary_prox) {
    // check if we're near this obstacle
    if(this.nearObstacle(objX, objY, prox)) {
      for(let i = 0; i < this.boundaries.length; i++) {
        let boundary = this.boundaries[i];
        if(this.nearBoundary(objX, objY, boundary.x, boundary.y, boundary_prox)) return true;
      }
    }
    return false;
  }

  nearObstacle(objX, objY, prox) {
    let distance = getDistance(objX, objY, this.center.x, this.center.y);
    return (distance <= prox)? true : false;
  }

  // Checks if an object is near this boundary
  nearBoundary(objX, objY, boundX, boundY, prox) {
    let distance = getDistance(objX, objY, boundX, boundY);
    return distance <= prox;
  }
}

module.exports = Obstacle;
