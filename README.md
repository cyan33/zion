# Zion

A light-weight, un-opinionated game engine/library based on HTML5 Canvas game development.

> Built along the course CSC 481/591 Game Engine Development, @NC State, 2017.

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

## Get Started

```sh
npm install --save zion
```

```js
import zion from 'zion';
```

## Features

### Game Flow

To build a game, whatever platform it's based on, we can think of the whole game as a (infinite) state machine. The whold flow is all about ***updating state*** and ***rendering the canvas*** in a constant interval(game loop).

The more you decouple between the state updating logic and the game rendering, the easier your game is to maintain and scale.

```js
import zion from 'zion';

const { Game } = zion.createComponents();
// in your entry file you'll have the main class extend the base class `Game`

class MyGame extends Game {
  update() {

  }

  render() {

  }

  init() {
    // run update and render consecutively, in a constant interval
    gameLoop();
  }
}
```

<!-- ### Game Config

A scalable game should have a separated configuration file, where you define the name of every constants. But sometimes, importing some of the game configuration all over you project could be a pollution and useless noise.

Zion uses closure to handle all your configurations. Simple pass the big json into `zion.addConfigs(jsonConfig);` and you are ready to use any of them elsewhere, by `zion.getConfig('config-key');` -->

### Basic Rendering

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

### Particle System

TBD

### I/O

* Audio Manager

<!--- The APIs of audio manager should be modified further --->

```js
const audioMgr = zion.createAudioManager('/src/');  // absolute path from root folder

audioMgr.loadAudios({
  collision: 'collision.mp3'  // file name under the folder
});
audioMgr.findByName('collision').play();
```

* Keyboard Input and Output

Zion uses `keybus` for keyboard handler, which supports simultaneous keydown event, which is essential in direction control.

<!--- The APIs of keybus should be modified further --->

```js
// pass in the DOM element to which all the events are binded
const kb = zion.createKeybus(document)

let token = kb.down(13, () => console.log('Enter keydown!'))

token.remove()
```

* Drag and Drop

Support basic drag and drop utilities:

* `getDraggingItemIndex()`
* `isCollapsed()`: dragging collision detection

### Network

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

### AI

TBD

### Appendix: Utils

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

### Demos

Get the general idea and best practice with games built along with Zion:

* [Alchemy Game]() (drag n drop)
* [Local Snake Game]() (Basic rendering)
* [Mutilplayer Online Snake Game]() (Network)
* [Asteroids]() (Particle System, collision, etc)
* [Cops and Robbers]() (AI)
## Acknowledgement

* [@jegood]()
* [@cntucker]()
* [@cjvalent]()