const createIO = require('./network');
const createCanvasUtilities = require('./canvas');
const createDnD = require('./dnd');
const createGame = require('./components/Game');

const zion = (function() {
  let gameConfig = {};

  function addConfigs(obj) {
    gameConfig = Object.assign({}, gameConfig, obj);
  }

  function getConfig(name) {
    if (name) return gameConfig[name];
    return gameConfig;
  }

  return {
    addConfigs,
    getConfig,
    createGame,
    createIO,
    createCanvasUtilities,
    createDnD
  };
})();

module.exports = zion;