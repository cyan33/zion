class Sprite {
  constructor(src, { width, height }, { x, y }){
    this.src = src;
    this.size = { width, height };
    this.position = { x, y };
  }
}

module.exports = Sprite;
