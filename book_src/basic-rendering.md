# Basic Rendering

Zion provides a few rendering utilities on top of the native canvas API, like `clearCanvas()`, `coordinateConversion()`, `insertText()`, etc, which save you from diving too deep into the fuss.

Specifically, for image rendering, Zion uses the [**canvas-image-cache**](https://github.com/thomasyimgit/canvas-image-cache), which enhances the performance in a way that image instances will not be recreated from scratch for each rendering after being loaded at first.

```js
const cu = zion.createCanvasUtils();

cu.clearCanvas(canvas, context);
```

The basic APIs below:

- `clearCanvas(canvas, context)`
- `coordinateConversion(canvas, x, y)` : get the coordination with respect to the canvas boundaries
- `getBoundaries({ x, y }, size)`
- `generateRandomPosition(canvas, middle = false, spriteSize)`
- `createImageCache()`: create the canvas-image-cache utility
- `drawRotate(context, { img, x, y, degrees })`: draw rotate sprites
- `insertText(context, options = {})`: insert text into canvas

# Particle Systems

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
