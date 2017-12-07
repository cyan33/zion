# Base Classes

To conform to the Object-Oriented Paradigm, a few base classes are provided for extension.

```js
const { Sprite } = zion.createComponents();

class SnakeSegment extends Sprite {
  // ...
}
```

- `Game` The game entry class. We suggest you extend it in your main game file.
- `Sprite` The basic build block which are integrated into a larger scene.
- `SpriteSheet` A bitmap image class that contains several smaller graphics in a tiled grid arrangement. Used in animations.
- `Particle` and `ParticleSystem` See [Particle Systems](#particle-systems).
- `Obstacle` An extendable collision-detection system. See [Physics](#physics).
