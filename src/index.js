/**
 * @author Chang
 */
const createIO = require('./network');
const createCanvasUtilities = require('./canvas');
const createDnD = require('./dnd');
const createGame = require('./components/Game');

const zion = (function() {
  return {
    createGame,
    createIO,
    createCanvasUtilities,
    createDnD
  };
})();

module.exports = zion;