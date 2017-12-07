# Physics

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

- `getDetails()` Returns a string representation of this Obstacle's properties (size, position, divisionType, boundaries)
- `drawBoundariesDebug()` Draws red squares indicating the on-screen location of an Obstacle's boundaries (use in your `draw()` function).
