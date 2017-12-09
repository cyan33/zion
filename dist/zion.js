/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function removeMultiElementFromArray(arr, ...indexes) {
  indexes.sort((a, b) => b - a);  // decendent
  for (let i = 0; i< indexes.length; i++) {
    arr.splice(indexes[i], 1);
  }
  return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getDistance(x1, y1, x2, y2) {
  return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

function calculateCenter(x, y, width, height) {
  return {x: x + (0.5 * width), y: y + (0.5 * height)};
}

module.exports = () => {
  removeMultiElementFromArray,
  getRandomInt,
  getDistance,
  calculateCenter;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * @author Chang
 */
class Sprite {
  constructor(src, { width, height }, { x, y }){
    this.src = src;
    this.size = { width, height };
    this.position = { x, y };
  }
}

module.exports = Sprite;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author jegood
 */
const Sprite = __webpack_require__(1);
const { getDistance, calculateCenter } = __webpack_require__(0)();
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author jegood
 */
const Obstacle = __webpack_require__(2);
const { getRandomNumber } = __webpack_require__(0)();
const MAX_CIRCLE = 360;

class Particle extends Obstacle {
  constructor(src, size, { x, y }, speed, divisionType) {
    super(src, size, { x, y }, divisionType);
    this.setSpeed(speed);
    this.theta = getRandomNumber(MAX_CIRCLE);
  }

  setSpeed(speed) {
    this.speed = speed;
  }
}

module.exports = Particle;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Chang
 */
const createImageCache = __webpack_require__(16);

function clearCanvas(canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function coordinateConversion(canvas, x, y) {
  let box = canvas.getBoundingRect();
  return {
    x: Math.round(x - box.left),
    y: Math.round(y - box.right)
  };
}

function getBoundaries(pos, size) {
  const { x, y } = pos;
  const { width, height } = size;

  return {
    top: y,
    left: x,
    bottom: y + height,
    right: x + width,
  };
}

function generateRandomPosition(canvas, middle = false, size) {
  let x, y;
  const getRandomNumBetween = (min, max) => Math.random() * (max - min) + min; 
  const { width, height } = size;

  if (middle) {
    x = Math.round(getRandomNumBetween(canvas.width * 0.2, canvas.width * 0.8 - width));
    y = Math.round(getRandomNumBetween(canvas.height * 0.2, canvas.height * 0.8 - height));
  } else {
    x = Math.round(getRandomNumBetween(0, canvas.width - width));
    y = Math.round(getRandomNumBetween(0, canvas.height - height));
  }
  return { x, y };
}

function drawRotate(context, { img, x, y, degrees, effect }) {
  context.save();
  context.translate(x + img.width / 2, y + img.height / 2);
  context.rotate(degrees * Math.PI / 180);
  context.drawImage(img, 0, 0, img.width, img.height,
    -img.width / 2, -img.height / 2, img.width, img.height);
  if (!effect) {
    let row = Math.floor(effect.currentFrame / effect.numFrames);
    let col = Math.floor(effect.currentFrame % effect.numFrames);
    context.drawImage(effect.img, col*effect.frameWidth, row*effect.frameHeight, effect.frameWidth, effect.frameHeight,
      (-img.width / 2) + effect.offset.x, (-img.height / 2) + effect.offset.y, effect.frameWidth, effect.frameHeight);
  }
  context.restore();
}

function insertText(context, options = { }) {
  const { text, font, position: { x, y }, color } = options;

  context.fillStyle = color;
  context.font = font;

  context.fillText(text, x, y);
}

module.exports = () => {
  clearCanvas,
  coordinateConversion,
  getBoundaries,
  generateRandomPosition,
  createImageCache,
  drawRotate,
  insertText;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * @author Chang
 */
const createComponents = __webpack_require__(7);
// const createIO = require('./network');
const createCanvasUtils = __webpack_require__(4);
const createAudioManager = __webpack_require__(17);
const createDnD = __webpack_require__(18);
const createUtils = __webpack_require__(0);
const createKeyBus = __webpack_require__(19);

(function(root) {
  const zion = {
    createComponents,
    createUtils,
    // createIO,
    createKeyBus,
    createAudioManager,
    createCanvasUtils,
    createDnD
  };

  if (true) {
    module.exports = zion;
    /* eslint-disable no-undef */
  } else if (define && typeof define === 'function' && define.amd) {
    /* eslint-disable no-undef */
    define(function() { return root.zion = zion; });
  } else {
    root.zion = zion;
  }
})(typeof window === 'object' ? window : global);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Chang
 */
const Game = __webpack_require__(8);
const Obstacle = __webpack_require__(2);
const Particle = __webpack_require__(3);
const ParticleSystem = __webpack_require__(9);
const Sprite = __webpack_require__(1);
const SpriteSheet = __webpack_require__(10);
const AI = __webpack_require__(11);
const AStar = __webpack_require__(14);

module.exports = () => {
  return {
    Game,
    Obstacle,
    Particle,
    ParticleSystem,
    Sprite,
    SpriteSheet,
    AI,
    AStar
  };
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * @author jegood
 */
class Game {
  // Sets the update loop
  update(){
    /* eslint-disable no-console */
    console.warn('Update must be implemented');
  }

  // Sets the render loop
  render() {
    /* eslint-disable no-console */
    console.warn('Render must be implemented');
  }

  // The game loop managed by the engine
  gameloop() {
    // to use gameloop, you must do the binding in the constructor in the subclass
    // aka, this.gameloop = this.gameloop.bind(this), to get access to update and render
    this.update();
    this.render();
  }

  // Initializes base game components
  init() {
    throw new Error('Init must be implemented');
  }
}

module.exports = Game;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author jegood
 */
const _ = __webpack_require__(0)();
const Particle = __webpack_require__(3);
/**
 * Class for handling particle systems. For now, simply allows management
 * of particles related to size, position, and movement. This will later
 * be extended to include varying distribution patterns (e.g. cone, cylinder, etc.)
 */

class ParticleSystem {
  constructor(){
    this.particles = [];
  }

  createUniformParticles(src, size, { x, y }, speed, numParts, divisionType) {
    for(let i = 0; i < numParts; i++) {
      this.particles.push(new Particle(src, size, { x, y }, speed, divisionType));
    }
  }

  createRandomizedParticles(options) {
    for(let i = 0; i < options.numParticles; i++) {
      this.generateRandomParticle(options);
    }
  }

  generateRandomParticle(options) {
    const x = _.getRandomInt(options.maxHorizontal);
    const y =  _.getRandomInt(options.maxVertical);
    const speed = _.getRandomInt(options.speed);
    this.particles.push(new Particle(options.src, options.size, { x, y }, speed, options.divisionType));
  }
}

module.exports = ParticleSystem;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * @author jegood
 */
class Spritesheet {
  constructor(url, frameWidth, frameHeight, frameSpeed, endFrame, { x, y }){
    this.url = url;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameSpeed = frameSpeed;
    this.endFrame = endFrame;
    this.offset = { x, y };
    this.init();
  }

  init() {
    this.img = new Image();
    this.numFrames;
    this.currentFrame = 0;
    this.counter = 0;
    this.img.onload = () => {
      this.numFrames = Math.floor(this.img.width / this.frameWidth);
    };
    this.img.src = this.url;
  }

  update() {
    if(this.counter === (this.frameSpeed - 1)) {
      this.currentFrame = (this.currentFrame + 1) % this.endFrame;
    }
    this.counter = (this.counter + 1) % this.frameSpeed;
  }

  getDetails() {
    return `url: ${this.url}\nframeWidth: ${this.frameWidth}\nframeHeight: ${this.frameHeight}\nframeSpeed: ${this.frameSpeed}\nendFrame: ${this.endFrame}\noffset_x: ${this.offset.x}\noffset_y: ${this.offset.y}`;
  }
}

module.exports = Spritesheet;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Sprite = __webpack_require__(1);
const Vector = __webpack_require__(12);
const Path = __webpack_require__(13);
const { getRandomInt } = __webpack_require__(0)();
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


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const { getDistance } = __webpack_require__(0)();

// todo: should be a class
function Vector() {
  const add = (v1, v2) => {
    return {x: v1.x + v2.x, y: v1.y + v2.y};
  };

  const sub  = (v1, v2) => {
    return {x: v1.x - v2.x, y: v1.y - v2.y};
  };

  const mult = (v, factor) => {
    return {x:v.x * factor, y:v.y * factor};
  };

  const limit = (v, factor) => {
    return {x:v.x / factor, y:v.y / factor};
  };

  const normalize = (v) => {
    const mag = Vector.mag(v);
    return {x: v.x / mag, y: v.y / mag};
  };

  const mag = (v) => {
    return Math.sqrt((v.x * v.x) + (v.y * v.y));
  };
    
  const dist = (v1, v2) => {
    return getDistance(v1.x, v1.y, v2.x, v2.y);
  };

  return { add, sub, mult, limit, normalize, mag, dist };
}

module.exports = Vector;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

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


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

const VertexRecord = __webpack_require__(15);
const { getDistance } = __webpack_require__(0)();

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


/***/ }),
/* 15 */
/***/ (function(module, exports) {

class VertexRecord {
  constructor(v) {
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


/***/ }),
/* 16 */
/***/ (function(module, exports) {

function createImageCache() {
  let images = []
  let imgPromises = []
  let hasFinishedLoading = false

  function loadSingleImage(name, src) {
    imgPromises.push(new Promise((resolve, reject) => {
      let img = new Image()
      img.src = src

      hasFinishedLoading = false
      
      try {
        img.onload = () => {
          images.push({ name, img })
          hasFinishedLoading = true

          resolve({
            name,
            img
          })
        }
      } catch (err) {
        reject(err)
      }
    }))
  }

  function loadImages(arr) {
    arr.forEach(item => {
      loadSingleImage(item.name, item.src)
    })
  }
  
  function imagesOnLoad(callback) {
    // callback(arr)
    Promise.all(imgPromises).then(callback)
  }

  function getImages() {
    if (hasFinishedLoading) {
      return images
    } else {
      throw console.warn('Image hasn\'t finished loading. You may use getImages() in the callback of the imagesOnLoad function.')
    }
  }

  return {
    loadSingleImage,
    loadImages,
    getImages,
    imagesOnLoad
  }
}

module.exports = createImageCache


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * @author jegood, Chang
 * todo: path should be more flexible and more capable of error handling
 * @param {String} path, which matches the regex pattern below
 */
function createAudioManager(path) {
  // path: ./src/
  const audios = {};

  function addSingleAudio(key, filename) {
    return audios[key] || (audios[key] = filename);
  }

  function loadAudios(audios) {
    for (let key in audios) {
      addSingleAudio(key, audios[key]);
    }
  }

  // todo: buggy
  function getAudioByName(name) {
    const file = `${path}${name}`;
    return audios.find((a) => {
      const { src } = a;
      return src === file;
    });
  }

  return {
    addSingleAudio,
    loadAudios,
    getAudioByName
  };
}

module.exports = createAudioManager;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = createDnD;
/**
 * @author Chang
 */
const { getBoundaries } = __webpack_require__(4)();

/**
 * drag and drop in canvas is much different than in DOM, because the canvas comes
 * as a whole, so these functions may seem to be hacky, or dirty.
 */
function createDnD() {
  const getDraggingItemIndex = (items, x, y) => {
    for (let i = 0; i < items.length; i++) {
      let currItem = items[i];
      let {
        top,
        left,
        right,
        bottom
      } = getBoundaries(currItem.position, currItem.size);

      if (x < right && x > left && y < bottom && y > top) {
        return i;
      }
    }
    return -1;
  };

  // todo: add further wrapped apis, like sprite.draggable()

  let isCollapsed = (items, draggingIndex) => {
    // check if the `draggingIndex`th of items overlaps any one of the rest elements
    if (draggingIndex < 0 || items.length === 0)  return;

    const dragging = items[draggingIndex];
        
    const { x, y } = dragging.position;
    const center = {
      x: x + dragging.size.width / 2,
      y: y + dragging.size.height / 2,
    };

    for (let i = 0; i < items.length; i++) {
      if (i === draggingIndex)    continue;
      const {
        top,
        right,
        left,
        bottom
      } = getBoundaries(items[i].position, items[i].size);
      if (center.x < right && center.x > left 
                && center.y < bottom && center.y > top) {
        return i;
      }
    }
    return -1;
  };
    
  return {
    isCollapsed,
    getDraggingItemIndex,
  };
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const createKeyBus = __webpack_require__(20);

module.exports = createKeyBus;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

function createKeyBus(target) {
  const simulDownListeners = {};
  let isMultiKey = false;
  let keyhash = null;

  if (!(target instanceof HTMLElement)) {
    throw Error('KeyBus: target must be a DOM element.');
  }

  function enableMultiKey() {
    isMultiKey = true;
    keyhash = {};
  }

  function disableMultiKey() {
    isMultiKey = false;
    keyhash = null;
  }

  function getKeyhash() {
    return isMultiKey ? keyhash : null;
  }

  function down(keyCode, cb) {
    if (isMultiKey) {
      throw Error('multikey handlers should not use the "down" method of KeyBus');
      return;
    }

    function keydownHandler(e) {
      if (e.keyCode === keyCode) {
        e.preventDefault();
        cb(e);
      }
    }

    target.addEventListener('keydown', keydownHandler);
    
    return {
      remove() {
        target.removeEventListener('keydown', keydownHandler);
      }
    };
  }

  function up(keyCode, cb) {
    if (isMultiKey) {
      throw Error('multikey handlers should not use the "on" method of KeyBus');
      return;
    }

    function keyupHandler(e) {
      if (e.keyCode === keyCode) {
        e.preventDefault();
        cb(e);
      }
    }

    target.addEventListener('keyup', keyupHandler);

    return {
      remove() {
        target.removeEventListener('keyup', keyupHandler);
      }
    };
  }

  function simulDown(keyCode, cb) {
    simulDownListeners[keyCode] ? simulDownListeners[keyCode] = [cb] 
      : simulDownListeners[keyCode].push(cb);

    function updateKeyhash(e, val) {
      if (e.keyCode === keyCode) {
        e.preventDefault();
        keyhash[keyCode] = val;
      }
    }

    const keydownUpdate = (e) => updateKeyhash(e, true);
    const keyupUpdate = (e) => updateKeyhash(e, false);


    target.addEventListener('keydown', keydownUpdate);
    target.addEventListener('keyup', keyupUpdate);

    return {
      remove() {
        simulDownListeners[keyCode].splice(simulDownListeners[keyCode].indexOf(cb), 1);

        target.removeEventListener('keydown', keydownUpdate);
        target.removeEventListener('keyup', keyupUpdate);
      }
    };
  }

  function executeMultiKeyHandlers() {
    for (let key in simulDownListeners) {
      if (keyhash[key]) {
        simulDownListeners[key].forEach(cb => {
          cb();
        });
      }
    }
  }
}

module.exports = createKeyBus;


/***/ })
/******/ ]);