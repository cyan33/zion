const Sprite = require('../Sprite');
const Vector = require('./Vector');
const Path = require('./Path');
const { getRandomInt } = require('../../utils')();
/** target proximity to halt path following */
const TARGET_PROX = 5;
const vector = Vector();
const offset = 10;

// *Note: all vector related methods will need to be updated
class AI extends Sprite {
  constructor (src, size, pos, params) {
    super(src, size, pos);
    this.initPosition = pos; // initial position
    this.velocity = params.velocity; // velocity
    this.acceleration = params.acceleration; // acceleration
    this.maxForce = params.maxForce; // max steering force
    this.maxSpeed = params.maxSpeed; // max speed
    this.initMaxSpeed = params.maxSpeed; // initial max speed
    this.currentNode = 0; // current node
    this.maxAcceleration = params.maxAcceleration; // max acceleration
    this.rod = params.rod; // radius of deceleration at which to slow down (50)
    this.ros = params.ros; // radius of satisfaction in which to arrive at target (3)
    this.timeToTarget = params.timeToTarget; // Holds the time over which to achieve target speed (0.8)
    this.followingTarget = false; // are we currently following something?
  }
    
  /**
     * Updates AI parameters.
     */
  update() {
    throw new Error('update() must be implemented');
  }
  /**
     * Displays the AI to the screen.
     */
  display() {
    throw new Error('display() must be implemented');
  }
    
  /**
     * Performs necessary parameter updates for this AI
     */
  run() {
    throw new Error('run() must be implemented');
  }

  /**
     * Orients the player in the direction of the target
     * @param des desired velocity vector to orient
     * @return the steering vector to orient the player
     */
  getOrientation(des){
    return vector.sub(des, this.velocity);
  }
    
  /**
     * Applies a force in the direction of the given vector
     * @param f the force to apply
     */
  applyForce(f){
    this.acceleration = vector.add(this.acceleration, f);
  }
    
  /**
     * Seek algorithm for moving character to a target location
     * Algorithm adapted from Daniel Shiffman's "The Nature of Code"
     * @param t the target to seek
     */
  seek(t){
    // Get the desired velocity vector
    let des = vector.sub(t, this.position);
    // Scale to max speed
    des = vector.normalize(des);
    des = vector.mult(des, this.maxSpeed);
    // Get the steering vector
    let steer = this.getOrientation(des);
    vector.limit(steer, this.maxForce);
    // Apply steering force
    this.applyForce(steer);
  }
    
  /**
     * Arrive algorithm for directing character away from a target
     * Algorithm modified and adapted from Daniel Shiffman's "The Nature of Code"
     * @param t the target from which to flee
     */
  flee(t){
    // Get the desired velocity vector away from the target
    let des = vector.sub(this.position, t);
    // Scale to max speed
    des = vector.normalize(des);
    des = vector.mult(des, this.maxSpeed);
    // Get the steering vector
    let steer = this.getOrientation(des);
    steer = vector.limit(steer, this.maxForce);
    // Apply steering force
    this.applyForce(steer);
  }
    
  /**
     * Arrive algorithm. Adapted from "Artificial Intelligence for Games"
     * @param t the target at which to arrive
     */
  arrive(t){
    // Get direction target
    let dir = vector.sub(t, this.position);
    let targetSpeed = 0;
    // Get distance to target
    let dist = vector.mag(dir);
    // If at target, do nothing
    if(dist < this.ros){
      // Stop within ros
      let stop = {x: -this.velocity.x/2, y:-this.velocity.y/2};
      this.applyForce(stop); // want to cancel
      return;
    }
    // If we're outside deceleration radius, go maxSpeed
    if(dist > this.rod){
      targetSpeed =this.maxSpeed;
    }else{
      // Otherwise, calculate scaled speed
      targetSpeed = this.maxSpeed * dist / this.rod;
    }
    // Get target velocity (combines speed and direction)
    dir = vector.normalize(dir);
    dir = vector.mult(dir, targetSpeed);
    let steer = this.getOrientation(dir);
    // Need to slow down (added)
    steer = vector.limit(steer, this.timeToTarget);
    //Check if acceleration is too fast
    if(vector.mag(steer) > this.maxAcceleration){
      steer = vector.normalize(steer);
      steer = vector.mult(steer, this.maxAcceleration);
    }
    // Limit force
    steer = vector.limit(steer, this.maxForce);
    // Apply steering force
    this.applyForce(steer);
  }
    
  /**
     * Generates the lowest cost path to the next target to follow
     * @param t the target in which to find the path
     * @param g graph of the room (GraphGenerator class)
     * @param aStar provides A* pathfinding (AStar class)
     * @return the lowest cost path to the given target
     */
  findNextTarget(t, g, aStar){
    // Find nearest target and character positions on the graph
    let target = this.findNearest(t, g); // class vertex
    let player = this.findNearest(this.position, g); // class vertex
    // Get the path from the player's position to the target
    let result = aStar.AStarPathfind(g.getGraph(), player, target); // vertex array
    // Make the path for the player to follow
    let p = null; // class Path
    // Add the new path if we aren't already close enough to the target
    if(result !== null){
      p = new Path();
      for(let i = 0; i < result.length; i++){
        p.add(result[i].getLoc());
      }
    }
    // Reset currentNode to start of the path
    this.resetPathNode();
    // Return the new path to follow
    return p;
  }
    
  /**
     * Path following algorithm
     * @param p the path to follow
     * @param t the target to approach
     */
  follow(p, t){
    let target = null;
    // Check if we are not within proximity to the target
    if(this.followingTarget && !this.withinTargetProximity(t) && p != null){
      // Find the node to seek
      if(p.getPath().length > 0){
        // Set the target to the next available node in the path
        target = p.getPath()[this.currentNode];
        // Check if we are within offset pixels of the target
        if(vector.dist(this.position, target) <= offset){
          // Update to the next node to arrive at
          this.currentNode++;
          // Check if we are on the last node
          if(this.currentNode == p.getPath().length){
            // Set the last node in the path as the one to arrive at
            this.currentNode = p.getPath().length - 1;
          }
        }
                
        // Check if we're on the last node and the distance to the actual target is less than the distance
        // to that node
        if (this.currentNode == p.getPath().length - 1) { // on the last node
          if(vector.dist(this.position, t) < vector.dist(this.position, target) || this.position != t){
            this.seek(t);
          } else {
            this.arrive(target);
          }
        } else if(this.currentNode != p.getPath().length - 1){
          this.seek(target);
        }
      } else {
        // No reasonable path and we are close enough, so just arrive at the target
        this.seek(t);
      }
    } else {
      this.followingTarget = false;
    }
  }
    
  /**
     * Quantizes the target position by finding the nearest node on the world graph
     * @param t the target to quantize
     * @param g graph of room
     * @return the closest vertex to the target
     */
  findNearest(t, g){
    // Loop through each point in the graph and find the nearest node
    let size = g.getGraph().length;
    let dist_smallest = Number.MAX_SAFE_INTEGER; // change to greatest number value
    let closest = null;
    for(let i = 0; i < size; i++){
      // Get distance from target to current node
      let dist = Math.abs(vector.dist(t, g.getGraph()[i].getLoc()));
      // Check if new smallest distance to target
      if(dist <= dist_smallest){
        dist_smallest = dist;
        closest = g.getGraph()[i];
      }
    }
    //System.out.println("closest vertex is " + closest.getValue());
    // Return the closest vertex
    return closest;
  }
    
  /**
     * Resets the current node to the beginning of a new path
     */
  resetPathNode(){
    this.currentNode = 0;
  }
    
  /** 
     * Returns a String representation of the given path.
     * Primarily used for testing.
     * @param path the path to generate (list of vertices)
     * @return a String representation for this path
     */
  pathToString(path){
    let disp = '';
    for(let i = 0; i < path.length; i++){
      disp += path[i].getValue() + ' ';
    }
    return disp;
  }
    
  /**
     * Checks the distance to the room boundaries from AI's
     * current location. Returns whether the AI is within the
     * appropriate range for steering away from these boundaries.
     * @param boundaries the boundaries to check (list of points)
     * @return whether the AI is within a certain distance to these boundaries
     */
  checkRoomBoundaries(boundaries){
    // Check for certain distance from screen edges
    // ** Note:
    //		height = dist(pos, width)
    //		width  = dist(pos, height)
    // Want the offset to be somewhere within the character's radius + some offset
    for(let i = 0; i < boundaries.length; i++){
      if(vector.dist(this.position, boundaries[i]) <= 35)
        return true;
    }
    return false;
  }
    
  /**
     * Sets a new random target on the room graph and directs the AI
     * to follow it until it is within a set offset from the target.
     * @param g the graph to follow (class GraphGenerator)
     * @param aStar provides A* pathfinding
     */
  followNewTarget(g, aStar){
    // Get a random point on the graph and pathfind
    const target_index = getRandomInt(g.getGraph().length);
    const target = g.getGraph()[target_index].getLoc();
    const path = this.findNextTarget(target, g, aStar); // Path
        
    // Follow this path until we are within a set distance from our target
    while(vector.dist(this.position, target) > TARGET_PROX){
      this.follow(path, target);
      // perform AI updates
      this.run();
    }
  }
    
  /**
     * Pathfinds to the point closest to the target and follows it.
     * @param g Graph representing room
     * @param aStar A* algorithm provider
     */
  retreatToNearestPath(g, aStar){
    // Get nearest point on the path to follow
    let nearest = this.findNearest(this.position, g).getNeighbors()[0].getNeighbor().getLoc(); // experimenting with getting a neighbor
    // Pathfind to this point
    let path = this.findNextTarget(nearest, g, aStar);
        
    // Follow this path until we are within a set distance from our target
    while(vector.dist(this.position, nearest) > TARGET_PROX){
      this.follow(path, nearest);
      // perform AI updates
      this.run();
    }
  }
    
  /**
     * Determines if a character is within the current target's allowable proximity.
     * @param t the target to check
     * @return if the player is within the allowable target proximity
     */
  withinTargetProximity(t){
    return vector.dist(this.position, t) <= TARGET_PROX;
  }
    
  /**
     * Returns if a character is currently following a target
     * @return if a character is currently following a target
     */
  isFollowingTarget(){
    return this.followingTarget;
  }
    
  /**
     * Sets the state of following the current target
     * @param following the state of following the current target
     */
  setFollowingTarget(following){
    this.followingTarget = following;
  }
}

module.exports = AI;
