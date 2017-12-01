<img src="https://i.loli.net/2017/12/01/5a2067a13e1a3.jpg" width="500px" alt="zion-banner">

# Zion

A light-weight, un-opinionated game engine/library based on HTML5 Canvas game development.

> Built along the course CSC 481/591 Game Engine Development, @NC State, 2017.

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)


# Table of Contents

- [Zion](#zion)
- [Get Started](#get-started)
- [Features](#features)
  - [Game Flow](#game-flow)
  - [Basic Rendering](#basic-rendering)
  - [Physics](#physics)
  - [Particle Systems](#particle-systems)
  - [I/O](#io)
  - [Network](#network)
  - [AI](#ai)
- [Gallery Page](#gallery-page)
- [Contribution](#contribution)
- [Acknowledgement](#acknowledgement)

# Get Started

```sh
npm install --save zion
```

```js
import zion from 'zion';
```

# Features

## Game Flow

To build a game, whatever platform it's based on, we can think of the whole game as a (infinite) state machine. The flow is all about ***updating state*** and ***rendering the canvas*** in a constant interval (game loop).

The more you decouple between the state updating logic and the game rendering, the easier your game is to maintain and scale.

```js
import zion from 'zion';

const { Game } = zion.createComponents();
// in your entry file you'll have the main class extend the base class `Game`

class MyGame extends Game {
  constructor() {
    this.gameloop = this.gameloop.bind(this);
  }

  update() {

  }

  render() {

  }

  init() {
    // run update and render consecutively, in a constant interval
    const timer = setInterval(this.gameLoop, TIME_INTERVAL);
  }
}
```

<!-- ### Game Config

A scalable game should have a separated configuration file, where you define the name of every constants. But sometimes, importing some of the game configuration all over you project could be pollution and useless noise.

Zion uses closure to handle all your configurations. Simply pass the big json into `zion.addConfigs(jsonConfig);` and you are ready to use any of them elsewhere, by `zion.getConfig('config-key');` -->

## Basic Rendering

Zion provides a few rendering utilities on top of the native canvas API, like `clearCanvas()`, `coordinateConversion()`, `insertText()`, etc, which save you from diving too deep into the fuss.

Specifically, for image rendering, Zion uses the [**canvas-image-cache**](https://github.com/thomasyimgit/canvas-image-cache), which enhances the performance in a way that image instances will not be recreated from scratch for each rendering after being loaded at first.

```js
const cu = zion.createCanvasUtils();

cu.clearCanvas(canvas, context);
```

The basic APIs below:

* `clearCanvas(canvas, context)`
* `coordinateConversion(canvas, x, y)` : get the coordination with respect to the canvas boundaries
* `getBoundaries({ x, y }, size)`
* `generateRandomPosition(canvas, middle = false, spriteSize)`
* `createImageCache()`: create the canvas-image-cache utility
* `drawRotate(context, { img, x, y, degrees })`: draw rotate sprites
* `insertText(context, options = {})`: insert text into canvas

## Physics

Zion provides a basic physics engine for sprite-sprite collisions called `Obstacle`. Unlike traditional bounding-box based systems, the engine sub-divides each obstacle into a pre-set number of low, medium, or high boundary levels. This implementation eliminiates the need for entire sprite collision checks as the system can more finely detect intersections at specific sprite edges.

Obstacles can be managed in groups or individually, depending on your game's structure:

```js
// Create a new obstacle. The last parameter specifies the divisionType for creating the different
// boundary levels (0 - 2: Low, Medium, High).
let obstacle = new Obstacle(src, {width: 16, height: 16}, {x: 0, y: 0}, 0);
```

Collision between obstacles and sprites is not strictly enforced. You may choose to apply collision through calling the `getCollision()` method from any obstacle. In this manner, obstacles and sprites that should not have collision are ignored.

```js
let car = new Sprite('car.png', size, position);

/**
 * objOffset specifies how close the sprite being examined should be allowed to come within 
 * the obstacle's range. boundsOffset extends the base distance at which it collides with
 * the obstacle.
 */
if(obstacle.getCollision(car, objOffset, boundsOffset)) {
  // do something
}
```

Zion provides additional support for debugging collision:
* `getDetails()` : returns a string representation of this Obstacle's properties (size, position, divisionType, boundaries)
* `drawBoundariesDebug()` : draws red squares indicating the on-screen location of an Obstacle's boundaries (use in your `draw()` function).

## Particle Systems

Zion supports an extendable particle system for grouped-sprite management. For visual effects, Zion provides two functions for easy object creation: `createUniformParticles()` and `createRandomizedParticles()`. The former allows simple creation of uniform particle sets, providing an efficient solution for multiple like-objects. The latter allows for randomized particle set creation, suitable for varied graphical effects and unevenly distributed objects (e.g. varying sprite sizes, speeds, etc.). All particles extend our **Obstacle** Physics System, requiring no additional collision detection.

You can create a new Particle System by supplying a Particle's desired properties:

```js
 // Create two new ParticleSystems: one uniform, one random
 let boulders = new ParticleSystem();
 let fire = new ParticleSystem();
 
 // Supply properties for the uniform system
 boulders.createUniformParticles(src, size, position, speed, numParticles, divisionType);
 
 // Specify options and create random particles
 let properties = {
     src: 'fire.png',
     size: {width: 10, height: 10},
     maxHorizontal: 30,
     maxVertical: 40,
     speed: 5,
     divisionType: 0
 };
 fire.createRandomizedParticles(options);
 ```
 
## I/O

* Audio Manager

<!--- The APIs of audio manager should be modified further --->

```js
const audioMgr = zion.createAudioManager('/src/');  // absolute path from root folder

audioMgr.loadAudio({
  collision: 'collision.mp3'  // file name under the folder
});
audioMgr.findByName('collision').play();
```

* Keyboard Input and Output

Zion uses [**keybus**](https://github.com/thomasyimgit/keybus) for keyboard handler, which supports simultaneous keydown event, which is essential in direction control.

<!--- The APIs of keybus should be modified further --->

```js
// pass in the DOM element to which all the events are binded
const kb = zion.createKeybus(document)

// simple keydown event
let token = kb.down(13, () => console.log('Enter keydown!'))
```

or multi-key handlers

```js
kb.simulDown(38, () => console.log('up'))
kb.simulDown(39, () => console.log('right'))

function game_loop() {
  // the only thing you need to do is to call this method in every game loop,
  // the keybus will automatically check if anykey is pressed and run the according handlers (could be more than one)
  kb.executeMultiKeyHandlers();
}

token.remove()
```

* Drag and Drop

Support basic drag and drop utilities:

* `getDraggingItemIndex()`
* `isCollapsed()`: dragging collision detection

## Network

Zion uses `Express.js` and `Socket.io` to host online multi-player games. The event-based communication between client and server makes it easy to figure out the data flow.

<!--- The APIs should be modified further --->

```js
// in server
const app = require('express')();
const http = require('http').Server(app);
const zion = require('zion');

const network = zion.createIO(http);

network.listen({
  'event-A': fnA.bind(fnA, params),
  'event-B': fnB.bind(fnB, params)
});
```

## AI

With most game AI, gameplay will revolve around player movement and interaction. Zion provides a fairly robust AI system, including standard movement, A* path-finding, and path-following. All player-centered functionality is provided by the `AI` class:

```js
let params = {
    velocity: {0,0},
    accleration: {0,0},
    maxForce: 0.1,
    maxSpeed: 2,
    maxAcceleration: 3,
    timeToTarget: 0.8
};
let character = new AI(src, size, position, params);
```

For movement, `AI` provides the following extendable behaviors:
* `seek(target)` : seek the given target's position.
* `flee(target)` : flee from the given target's position.
* `arrive(target)` : stop at the given target's position. The AI will slow and approach the target based on the initialized **Radius of Satisfaction (ROS)** and **Radius of Deceleration (ROD)**
* `follow(path, target)` : follow the given path to reach the intended target.

`AStar` complements `AI` by providing path-finding for any given weighted graph. The default hueristic utilizes Manhattan distance to find the optimal path for character movement:

```js
let aStar = new AStar();
let graph = [{x: 0, y: 0}, {x: 1, y: 1}, {x: 1, y: 3}, {x: 2, y: 4}, {x: 3, y: 2}];
let shortestPath = AStar.AStarPathFind(graph, graph[0], graph[3]);
```

Zion also provides a lightweight Decision Tree system for managing character states. Each decision tree is based on a system of `DecisionNodes` that constitute one of two action types: `CheckMethod` and `ActionMethod`. `CheckMethod` nodes determine the next node to traverse. These include any type of inquiries about a character's state or relationship to the game environment. `ActionMethod` nodes are the result of a single or sequence of `CheckMethod` nodes. These nodes change a character's state. A Decision Tree can be built as follows:

```js
function defineChecks() {
  let checkDistance = (character) => { ... }; // check character's distance to some game object
  let checkState = (character) => { ... }; // check the AI's state
  return { checkDistance, checkState };
}

function defineActions() {
  let nextState = (player, currState) { ... }; // transition character states
  let changeAppearance(state) { ... }; // change the character's appearance based on their current state
  return { nextStatet, changeAppearance };
}
// Store new checks and actions
let checks = defineChecks;
let actions = defineActions;
// Establish tree nodes...
let root = new DecisionNode(checks.checkDistance);
let leftChild = new DecisionNode(checks.checkState);
let leftAction = new DecisionNode(actions.nextState);
let rightChild = new DecisionNode(actions.changeAppearance);
// ...and parent them
leftChild.setTrueNode(leftAction);
root.setTrueNode(leftAction);
root.setFalseNode(rightChild);
```

To execute the tree, call `makeDecision()` for the appropriate character. This should generally be done in  `update()` as you will want to alter player states before rendering:

```js
update() {
  // Run our decision tree
  root.makeDecision();
}
```

## Appendix: Function Utils

In game development you probably are gonna use some of the calculation / operation utilities that are provided by Zion:

```js
const _ = zion.createUtils();

_.getRandomInt(1, 6);  // range from 1 to 6
```

* `getRandomInt(min, max);`
* `removeMultiElementFromArray(arr, ...indexes);`
* `getDistance(x1, y1, x2, y2);`
* `calculateCenter(x, y, width, height);`: x and y is the left top origin of the box.

* removeMultiElement

# Gallery Page

Check the games below on [**the gallery page**](http://thomasyimgit.github.io/Zion-demos/) of Zion:

Get the general idea and best practice with games built along with Zion:

* [Alchemy Game]() (drag n drop)
* [Local Snake Game]() (Basic rendering)
* [Mutilplayer Online Snake Game]() (Network)
* [Asteroids]() (Particle System, collision, etc)
* [Cops and Robbers]() (AI)

# Contribution

All PRs, issues and bug report are welcomed. Here are the steps to contribute:
1. Fork and clone this repo.
2. Make some changes.
3. Commit, push the changes to your forked repo.
4. Compare and make a pull request.

# Acknowledgement

* [@jegood](https://github.com/jegood)
