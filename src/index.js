/**
 * @author Chang
 */
const createComponents = require('./components');
const createIO = require('./network');
const createCanvasUtils = require('./canvas');
const createAudioManager = require('./audioManager');
const createDnD = require('./dnd');
const createUtils = require('./utils');
const createKeyBus = require('./keyboard');

(function(root) {
  const zion = {
    createComponents,
    createUtils,
    createIO,
    createKeyBus,
    createAudioManager,
    createCanvasUtils,
    createDnD
  };

  if (typeof exports === 'object') {
    module.exports = zion;
    /* eslint-disable no-undef */
  } else if (define && typeof define === 'function' && define.amd) {
    /* eslint-disable no-undef */
    define(function() { return root.zion = zion; });
  } else {
    root.zion = zion;
  }
})(typeof window === 'object' ? window : global);
