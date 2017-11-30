class Game {
  // Sets the update loop
  update(){
    // eslint-disable-next-line no-console
    console.warn('Update must be implemented');
  }

  // Sets the render loop
  render() {
    // eslint-disable-next-line no-console
    console.warn('Render must be implemented');
  }

  // The game loop managed by the engine
  gameloop() {
    // to use gameloop, you must do the binding in the constructor in the subclass
    // aka, this.gameloop = this.gameloop.bind(this), to get access to update and render
    this.update();
    this.render();
  }

  // Initializes base game components
  init() {
    throw new Error('Init must be implemented');
  }
}

module.exports = () => Game;
