/**
 * @author jegood
 */
const _ = require('../operations')();
const Particle = require('./Particle');
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
