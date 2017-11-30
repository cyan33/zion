/**
 * @author jegood
 */
const Obstacle = require('./Obstacle');
const { getRandomNumber } = require('../operations');
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
