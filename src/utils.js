function removeMultiElementFromArray(arr, ...indexes) {
  indexes.sort((a, b) => b - a);  // decendent
  for (let i = 0; i< indexes.length; i++) {
    arr.splice(indexes[i], 1);
  }
  return arr;
}

function getRandomNumber(max) {
  return Math.floor(Math.random()*(max));
}

function getDistance(x1, y1, x2, y2) {
  return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

function calculateCenter(x_coord, y_coord, width, height) {
  return {x: x_coord + (.5 * width), y: y_coord + (.5 * height)};
}

module.exports = {
  removeMultiElementFromArray,
  getRandomNumber,
  getDistance,
  calculateCenter
};
