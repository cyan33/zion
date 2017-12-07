# Game Flow

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
