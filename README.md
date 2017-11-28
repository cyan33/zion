# Zion

A light-weight, un-opinionated game engine/library based on HTML5 Canvas game development.

> Built along the course CSC 481/591 Game Engine Development, @NC State, 2017.

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

## Installation and Basic Usage

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
// in your entry file you'll have the main class extends Zion

class Game extends Zion {
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

### Basic Rendering

Zion provides a few rendering utilities on top of the native canvas API, like `clearCanvas()`, `coordinateConversion()`, `insertText()`, etc, which save you from diving too deep into the fuss.

Specifically, for image rendering, Zion uses the [**canvas-image-cache**](https://github.com/thomasyimgit/canvas-image-cache), which enhances the performance in a way that image instances will not be recreated from scratch for each rendering after being loaded at first.

### Particle System

### I/O

* Audio Manager

<!--- The APIs of audio manager should be modified further --->

```js
const audioMgr = zion.createAudioManager();
// static methods
audioMgr.findByName('./collision.mp3').play();
```

* Keyboard Input and Output

Zion uses `keybus` for keyboard handler, which supports simultaneous keydown event.

<!--- The APIs of keybus should be modified further --->

```js
// pass in the DOM element to which all the events are binded
const kb = zion.createKeybus(document)

let enterKeydownHandler = kb.down(13, () => console.log('Enter keydown!'))

enterKeydownHandler.remove()
```

* Drag and Drop

TBD

### Network

Zion uses Express.js and Socket.io to host online multi-player games. The event-based communication between client and server makes it easy to figure out the flow.

<!--- The APIs should be modified further --->

```js
// in server
const socket = require('socket.io');
const http = require('http');
const zion = require('zion');

const io = socket(http)
const network = zion.createNetwork();

network.listen({
  'event-A': callbackA() {
    io.emit('event-name', fn);
  },
  'event-B': callbackB() {}
});
```

### AI


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