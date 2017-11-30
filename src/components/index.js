/**
 * @author Chang
 */
const Game = require('./Game');
const Obstacle = require('./Obstacle');
const Particle = require('./Particle');
const ParticleSystem = require('./ParticleSystem');
const Sprite = require('./Sprite');
const SpriteSheet = require('./SpriteSheet');

module.exports = () => {
  return {
    Game,
    Obstacle,
    Particle,
    ParticleSystem,
    Sprite,
    SpriteSheet
  };
};
