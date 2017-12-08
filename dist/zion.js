/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @author Chang
 */
const createImageCache = __webpack_require__(3);

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

module.exports = () => {
  clearCanvas,
  coordinateConversion,
  getBoundaries,
  generateRandomPosition,
  createImageCache,
  drawRotate,
  insertText;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * @author Chang
 */
const createComponents = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./components/index\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
// const createIO = require('./network');
const createCanvasUtils = __webpack_require__(0);
const createAudioManager = __webpack_require__(4);
const createDnD = __webpack_require__(5);
const createUtils = __webpack_require__(6);
const createKeyBus = __webpack_require__(7);

(function(root) {
  const zion = {
    createComponents,
    createUtils,
    // createIO,
    createKeyBus,
    createAudioManager,
    createCanvasUtils,
    createDnD
  };

  if (true) {
    module.exports = zion;
    /* eslint-disable no-undef */
  } else if (define && typeof define === 'function' && define.amd) {
    /* eslint-disable no-undef */
    define(function() { return root.zion = zion; });
  } else {
    root.zion = zion;
  }
})(typeof window === 'object' ? window : global);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function createImageCache() {
  let images = []
  let imgPromises = []
  let hasFinishedLoading = false

  function loadSingleImage(name, src) {
    imgPromises.push(new Promise((resolve, reject) => {
      let img = new Image()
      img.src = src

      hasFinishedLoading = false
      
      try {
        img.onload = () => {
          images.push({ name, img })
          hasFinishedLoading = true

          resolve({
            name,
            img
          })
        }
      } catch (err) {
        reject(err)
      }
    }))
  }

  function loadImages(arr) {
    arr.forEach(item => {
      loadSingleImage(item.name, item.src)
    })
  }
  
  function imagesOnLoad(callback) {
    // callback(arr)
    Promise.all(imgPromises).then(callback)
  }

  function getImages() {
    if (hasFinishedLoading) {
      return images
    } else {
      throw console.warn('Image hasn\'t finished loading. You may use getImages() in the callback of the imagesOnLoad function.')
    }
  }

  return {
    loadSingleImage,
    loadImages,
    getImages,
    imagesOnLoad
  }
}

module.exports = createImageCache


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * @author jegood, Chang
 * todo: path should be more flexible and more capable of error handling
 * @param {String} path, which matches the regex pattern below
 */
function createAudioManager(path) {
  // path: ./src/
  const audios = {};

  function addSingleAudio(key, filename) {
    return audios[key] || (audios[key] = filename);
  }

  function loadAudios(audios) {
    for (let key in audios) {
      addSingleAudio(key, audios[key]);
    }
  }

  // todo: buggy
  function getAudioByName(name) {
    const file = `${path}${name}`;
    return audios.find((a) => {
      const { src } = a;
      return src === file;
    });
  }

  return {
    addSingleAudio,
    loadAudios,
    getAudioByName
  };
}

module.exports = createAudioManager;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = createDnD;
/**
 * @author Chang
 */
const { getBoundaries } = __webpack_require__(0)();

/**
 * drag and drop in canvas is much different than in DOM, because the canvas comes
 * as a whole, so these functions may seem to be hacky, or dirty.
 */
function createDnD() {
  const getDraggingItemIndex = (items, x, y) => {
    for (let i = 0; i < items.length; i++) {
      let currItem = items[i];
      let {
        top,
        left,
        right,
        bottom
      } = getBoundaries(currItem.position, currItem.size);

      if (x < right && x > left && y < bottom && y > top) {
        return i;
      }
    }
    return -1;
  };

  // todo: add further wrapped apis, like sprite.draggable()

  let isCollapsed = (items, draggingIndex) => {
    // check if the `draggingIndex`th of items overlaps any one of the rest elements
    if (draggingIndex < 0 || items.length === 0)  return;

    const dragging = items[draggingIndex];
        
    const { x, y } = dragging.position;
    const center = {
      x: x + dragging.size.width / 2,
      y: y + dragging.size.height / 2,
    };

    for (let i = 0; i < items.length; i++) {
      if (i === draggingIndex)    continue;
      const {
        top,
        right,
        left,
        bottom
      } = getBoundaries(items[i].position, items[i].size);
      if (center.x < right && center.x > left 
                && center.y < bottom && center.y > top) {
        return i;
      }
    }
    return -1;
  };
    
  return {
    isCollapsed,
    getDraggingItemIndex,
  };
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

function removeMultiElementFromArray(arr, ...indexes) {
  indexes.sort((a, b) => b - a);  // decendent
  for (let i = 0; i< indexes.length; i++) {
    arr.splice(indexes[i], 1);
  }
  return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function getDistance(x1, y1, x2, y2) {
  return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
}

function calculateCenter(x, y, width, height) {
  return {x: x + (0.5 * width), y: y + (0.5 * height)};
}

module.exports = () => {
  removeMultiElementFromArray,
  getRandomInt,
  getDistance,
  calculateCenter;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const createKeyBus = __webpack_require__(8);

module.exports = createKeyBus;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

function createKeyBus(target) {
  const simulDownListeners = {};
  let isMultiKey = false;
  let keyhash = null;

  if (!(target instanceof HTMLElement)) {
    throw Error('KeyBus: target must be a DOM element.');
  }

  function enableMultiKey() {
    isMultiKey = true;
    keyhash = {};
  }

  function disableMultiKey() {
    isMultiKey = false;
    keyhash = null;
  }

  function getKeyhash() {
    return isMultiKey ? keyhash : null;
  }

  function down(keyCode, cb) {
    if (isMultiKey) {
      throw Error('multikey handlers should not use the "down" method of KeyBus');
      return;
    }

    function keydownHandler(e) {
      if (e.keyCode === keyCode) {
        e.preventDefault();
        cb(e);
      }
    }

    target.addEventListener('keydown', keydownHandler);
    
    return {
      remove() {
        target.removeEventListener('keydown', keydownHandler);
      }
    };
  }

  function up(keyCode, cb) {
    if (isMultiKey) {
      throw Error('multikey handlers should not use the "on" method of KeyBus');
      return;
    }

    function keyupHandler(e) {
      if (e.keyCode === keyCode) {
        e.preventDefault();
        cb(e);
      }
    }

    target.addEventListener('keyup', keyupHandler);

    return {
      remove() {
        target.removeEventListener('keyup', keyupHandler);
      }
    };
  }

  function simulDown(keyCode, cb) {
    simulDownListeners[keyCode] ? simulDownListeners[keyCode] = [cb] 
      : simulDownListeners[keyCode].push(cb);

    function updateKeyhash(e, val) {
      if (e.keyCode === keyCode) {
        e.preventDefault();
        keyhash[keyCode] = val;
      }
    }

    const keydownUpdate = (e) => updateKeyhash(e, true);
    const keyupUpdate = (e) => updateKeyhash(e, false);


    target.addEventListener('keydown', keydownUpdate);
    target.addEventListener('keyup', keyupUpdate);

    return {
      remove() {
        simulDownListeners[keyCode].splice(simulDownListeners[keyCode].indexOf(cb), 1);

        target.removeEventListener('keydown', keydownUpdate);
        target.removeEventListener('keyup', keyupUpdate);
      }
    };
  }

  function executeMultiKeyHandlers() {
    for (let key in simulDownListeners) {
      if (keyhash[key]) {
        simulDownListeners[key].forEach(cb => {
          cb();
        });
      }
    }
  }
}

module.exports = createKeyBus;


/***/ })
/******/ ]);