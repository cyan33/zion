/**
 * @author Chang
 */
const createImageCache = require('canvas-image-cache');

function clearCanvas(canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function coordinateConversion(canvas, x, y) {
  let box = canvas.getBoundingRect();
  return {
    x: Math.round(x - box.left),
    y: Math.round(y - box.right)
  };
}

function getBoundaries(pos, size) {
  const { x, y } = pos;
  const { width, height } = size;

  return {
    top: y,
    left: x,
    bottom: y + height,
    right: x + width,
  };
}

function generateRandomPosition(canvas, middle = false, size) {
  let x, y;
  const getRandomNumBetween = (min, max) => Math.random() * (max - min) + min; 
  const { width, height } = size;

  if (middle) {
    x = Math.round(getRandomNumBetween(canvas.width * 0.2, canvas.width * 0.8 - width));
    y = Math.round(getRandomNumBetween(canvas.height * 0.2, canvas.height * 0.8 - height));
  } else {
    x = Math.round(getRandomNumBetween(0, canvas.width - width));
    y = Math.round(getRandomNumBetween(0, canvas.height - height));
  }
  return { x, y };
}

function drawRotate(context, { img, x, y, degrees, effect }) {
  context.save();
  context.translate(x + img.width / 2, y + img.height / 2);
  context.rotate(degrees * Math.PI / 180);
  context.drawImage(img, 0, 0, img.width, img.height,
    -img.width / 2, -img.height / 2, img.width, img.height);
  if (!effect) {
    let row = Math.floor(effect.currentFrame / effect.numFrames);
    let col = Math.floor(effect.currentFrame % effect.numFrames);
    context.drawImage(effect.img, col*effect.frameWidth, row*effect.frameHeight, effect.frameWidth, effect.frameHeight,
      (-img.width / 2) + effect.offset.x, (-img.height / 2) + effect.offset.y, effect.frameWidth, effect.frameHeight);
  }
  context.restore();
}

function insertText(context, options = { }) {
  const { text, font, position: { x, y }, color } = options;

  context.fillStyle = color;
  context.font = font;

  context.fillText(text, x, y);
}

module.exports = () => ({
  clearCanvas,
  coordinateConversion,
  getBoundaries,
  generateRandomPosition,
  createImageCache,
  drawRotate,
  insertText
});
