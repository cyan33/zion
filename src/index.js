/**
 * @author Chang
 */
const createComponents = require('./components');
const createIO = require('./network');
const createCanvasUtils = require('./canvas');
const createDnD = require('./dnd');
const createGame = require('./components/Game');
const createUtils = require('./utils');
const createKeyBus = require('./keyboard');

const zion = (function() {
  return {
    createComponents,
    createGame,
    createUtils,
    createIO,
    createKeyBus,
    createCanvasUtils,
    createDnD
  };
})();

module.exports = zion;