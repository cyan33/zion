const { getDistance } = require('../../utils')();

// todo: should be a class
function Vector() {
  const add = (v1, v2) => {
    return {x: v1.x + v2.x, y: v1.y + v2.y};
  };

  const sub  = (v1, v2) => {
    return {x: v1.x - v2.x, y: v1.y - v2.y};
  };

  const mult = (v, factor) => {
    return {x:v.x * factor, y:v.y * factor};
  };

  const limit = (v, factor) => {
    return {x:v.x / factor, y:v.y / factor};
  };

  const normalize = (v) => {
    const mag = Vector.mag(v);
    return {x: v.x / mag, y: v.y / mag};
  };

  const mag = (v) => {
    return Math.sqrt((v.x * v.x) + (v.y * v.y));
  };
    
  const dist = (v1, v2) => {
    return getDistance(v1.x, v1.y, v2.x, v2.y);
  };

  return { add, sub, mult, limit, normalize, mag, dist };
}

module.exports = Vector;
