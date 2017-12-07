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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @author Chang
 */
// const createComponents = require('./components/index');
// const createIO = require('./network');
var createCanvasUtils = __webpack_require__(1);
var createAudioManager = __webpack_require__(5);
var createDnD = __webpack_require__(6);
var createUtils = __webpack_require__(7);
var createKeyBus = __webpack_require__(8);

(function (root) {
  var zion = {
    // createComponents,
    createUtils: createUtils,
    // createIO,
    createKeyBus: createKeyBus,
    createAudioManager: createAudioManager,
    createCanvasUtils: createCanvasUtils,
    createDnD: createDnD
  };

  if (( false ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = zion;
    /* eslint-disable no-undef */
  } else if (__webpack_require__(10) && "function" === 'function' && __webpack_require__(11)) {
    /* eslint-disable no-undef */
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return root.zion = zion;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    root.zion = zion;
  }
})((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window : global);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author Chang
 */
var createImageCache = __webpack_require__(4);

function clearCanvas(canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function coordinateConversion(canvas, x, y) {
  var box = canvas.getBoundingRect();
  return {
    x: Math.round(x - box.left),
    y: Math.round(y - box.right)
  };
}

function getBoundaries(pos, size) {
  var x = pos.x,
      y = pos.y;
  var width = size.width,
      height = size.height;


  return {
    top: y,
    left: x,
    bottom: y + height,
    right: x + width
  };
}

function generateRandomPosition(canvas) {
  var middle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var size = arguments[2];

  var x = void 0,
      y = void 0;
  var getRandomNumBetween = function getRandomNumBetween(min, max) {
    return Math.random() * (max - min) + min;
  };
  var width = size.width,
      height = size.height;


  if (middle) {
    x = Math.round(getRandomNumBetween(canvas.width * 0.2, canvas.width * 0.8 - width));
    y = Math.round(getRandomNumBetween(canvas.height * 0.2, canvas.height * 0.8 - height));
  } else {
    x = Math.round(getRandomNumBetween(0, canvas.width - width));
    y = Math.round(getRandomNumBetween(0, canvas.height - height));
  }
  return { x: x, y: y };
}

function drawRotate(context, _ref) {
  var img = _ref.img,
      x = _ref.x,
      y = _ref.y,
      degrees = _ref.degrees,
      effect = _ref.effect;

  context.save();
  context.translate(x + img.width / 2, y + img.height / 2);
  context.rotate(degrees * Math.PI / 180);
  context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
  if (!effect) {
    var row = Math.floor(effect.currentFrame / effect.numFrames);
    var col = Math.floor(effect.currentFrame % effect.numFrames);
    context.drawImage(effect.img, col * effect.frameWidth, row * effect.frameHeight, effect.frameWidth, effect.frameHeight, -img.width / 2 + effect.offset.x, -img.height / 2 + effect.offset.y, effect.frameWidth, effect.frameHeight);
  }
  context.restore();
}

function insertText(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var text = options.text,
      font = options.font,
      _options$position = options.position,
      x = _options$position.x,
      y = _options$position.y,
      color = options.color;


  context.fillStyle = color;
  context.font = font;

  context.fillText(text, x, y);
}

module.exports = function () {
  clearCanvas, coordinateConversion, getBoundaries, generateRandomPosition, createImageCache, drawRotate, insertText;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(0);
module.exports = __webpack_require__(12);


/***/ }),
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author jegood, Chang
 * todo: path should be more flexible and more capable of error handling
 * @param {String} path, which matches the regex pattern below
 */
function createAudioManager(path) {
  // path: ./src/
  var audios = {};

  function addSingleAudio(key, filename) {
    return audios[key] || (audios[key] = filename);
  }

  function loadAudios(audios) {
    for (var key in audios) {
      addSingleAudio(key, audios[key]);
    }
  }

  // todo: buggy
  function getAudioByName(name) {
    var file = "" + path + name;
    return audios.find(function (a) {
      var src = a.src;

      return src === file;
    });
  }

  return {
    addSingleAudio: addSingleAudio,
    loadAudios: loadAudios,
    getAudioByName: getAudioByName
  };
}

module.exports = createAudioManager;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDnD;

/**
 * @author Chang
 */
var _require = __webpack_require__(1)(),
    getBoundaries = _require.getBoundaries;

/**
 * drag and drop in canvas is much different than in DOM, because the canvas comes
 * as a whole, so these functions may seem to be hacky, or dirty.
 */


function createDnD() {
  var getDraggingItemIndex = function getDraggingItemIndex(items, x, y) {
    for (var i = 0; i < items.length; i++) {
      var currItem = items[i];

      var _getBoundaries = getBoundaries(currItem.position, currItem.size),
          top = _getBoundaries.top,
          left = _getBoundaries.left,
          right = _getBoundaries.right,
          bottom = _getBoundaries.bottom;

      if (x < right && x > left && y < bottom && y > top) {
        return i;
      }
    }
    return -1;
  };

  // todo: add further wrapped apis, like sprite.draggable()

  var isCollapsed = function isCollapsed(items, draggingIndex) {
    // check if the `draggingIndex`th of items overlaps any one of the rest elements
    if (draggingIndex < 0 || items.length === 0) return;

    var dragging = items[draggingIndex];

    var _dragging$position = dragging.position,
        x = _dragging$position.x,
        y = _dragging$position.y;

    var center = {
      x: x + dragging.size.width / 2,
      y: y + dragging.size.height / 2
    };

    for (var i = 0; i < items.length; i++) {
      if (i === draggingIndex) continue;

      var _getBoundaries2 = getBoundaries(items[i].position, items[i].size),
          top = _getBoundaries2.top,
          right = _getBoundaries2.right,
          left = _getBoundaries2.left,
          bottom = _getBoundaries2.bottom;

      if (center.x < right && center.x > left && center.y < bottom && center.y > top) {
        return i;
      }
    }
    return -1;
  };

  return {
    isCollapsed: isCollapsed,
    getDraggingItemIndex: getDraggingItemIndex
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function removeMultiElementFromArray(arr) {
  for (var _len = arguments.length, indexes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    indexes[_key - 1] = arguments[_key];
  }

  indexes.sort(function (a, b) {
    return b - a;
  }); // decendent
  for (var i = 0; i < indexes.length; i++) {
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
  return { x: x + 0.5 * width, y: y + 0.5 * height };
}

module.exports = function () {
  removeMultiElementFromArray, getRandomInt, getDistance, calculateCenter;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createKeyBus = __webpack_require__(9);

module.exports = createKeyBus;

/***/ }),
/* 9 */
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


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******/(function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/var installedModules = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId]) {
      /******/return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/return __webpack_require__(__webpack_require__.s = 2);
  /******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

  "use strict";
  /* WEBPACK VAR INJECTION */
  (function (global) {
    var __WEBPACK_AMD_DEFINE_RESULT__;

    var _typeof = typeof Symbol === "function" && _typeof5(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === 'undefined' ? 'undefined' : _typeof5(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof5(obj);
    };

    /**
     * @author Chang
     */
    // const createComponents = require('./components/index');
    // const createIO = require('./network');
    var createCanvasUtils = __webpack_require__(1);
    var createAudioManager = __webpack_require__(5);
    var createDnD = __webpack_require__(6);
    var createUtils = __webpack_require__(7);
    var createKeyBus = __webpack_require__(8);

    (function (root) {
      var zion = {
        // createComponents,
        createUtils: createUtils,
        // createIO,
        createKeyBus: createKeyBus,
        createAudioManager: createAudioManager,
        createCanvasUtils: createCanvasUtils,
        createDnD: createDnD
      };

      if ((false ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = zion;
        /* eslint-disable no-undef */
      } else if (__webpack_require__(9) && "function" === 'function' && __webpack_require__(10)) {
        /* eslint-disable no-undef */
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
          return root.zion = zion;
        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      } else {
        root.zion = zion;
      }
    })((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window : global);
    /* WEBPACK VAR INJECTION */
  }).call(exports, __webpack_require__(3));

  /***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  /**
   * @author Chang
   */

  var createImageCache = __webpack_require__(4);

  function clearCanvas(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function coordinateConversion(canvas, x, y) {
    var box = canvas.getBoundingRect();
    return {
      x: Math.round(x - box.left),
      y: Math.round(y - box.right)
    };
  }

  function getBoundaries(pos, size) {
    var x = pos.x,
        y = pos.y;
    var width = size.width,
        height = size.height;

    return {
      top: y,
      left: x,
      bottom: y + height,
      right: x + width
    };
  }

  function generateRandomPosition(canvas) {
    var middle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var size = arguments[2];

    var x = void 0,
        y = void 0;
    var getRandomNumBetween = function getRandomNumBetween(min, max) {
      return Math.random() * (max - min) + min;
    };
    var width = size.width,
        height = size.height;

    if (middle) {
      x = Math.round(getRandomNumBetween(canvas.width * 0.2, canvas.width * 0.8 - width));
      y = Math.round(getRandomNumBetween(canvas.height * 0.2, canvas.height * 0.8 - height));
    } else {
      x = Math.round(getRandomNumBetween(0, canvas.width - width));
      y = Math.round(getRandomNumBetween(0, canvas.height - height));
    }
    return { x: x, y: y };
  }

  function drawRotate(context, _ref) {
    var img = _ref.img,
        x = _ref.x,
        y = _ref.y,
        degrees = _ref.degrees,
        effect = _ref.effect;

    context.save();
    context.translate(x + img.width / 2, y + img.height / 2);
    context.rotate(degrees * Math.PI / 180);
    context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
    if (!effect) {
      var row = Math.floor(effect.currentFrame / effect.numFrames);
      var col = Math.floor(effect.currentFrame % effect.numFrames);
      context.drawImage(effect.img, col * effect.frameWidth, row * effect.frameHeight, effect.frameWidth, effect.frameHeight, -img.width / 2 + effect.offset.x, -img.height / 2 + effect.offset.y, effect.frameWidth, effect.frameHeight);
    }
    context.restore();
  }

  function insertText(context) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var text = options.text,
        font = options.font,
        _options$position = options.position,
        x = _options$position.x,
        y = _options$position.y,
        color = options.color;

    context.fillStyle = color;
    context.font = font;

    context.fillText(text, x, y);
  }

  module.exports = function () {
    clearCanvas, coordinateConversion, getBoundaries, generateRandomPosition, createImageCache, drawRotate, insertText;
  };

  /***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

  __webpack_require__(0);
  __webpack_require__(0);
  module.exports = __webpack_require__(11);

  /***/
},
/* 3 */
/***/function (module, exports) {

  var g;

  // This works in non-strict mode
  g = function () {
    return this;
  }();

  try {
    // This works if eval is allowed (see CSP)
    g = g || Function("return this")() || (1, eval)("this");
  } catch (e) {
    // This works if the window reference is available
    if ((typeof window === 'undefined' ? 'undefined' : _typeof5(window)) === "object") g = window;
  }

  // g can still be undefined, but nothing to do about it...
  // We return undefined, instead of nothing here, so it's
  // easier to handle this case. if(!global) { ...}

  module.exports = g;

  /***/
},
/* 4 */
/***/function (module, exports) {

  function createImageCache() {
    var images = [];
    var imgPromises = [];
    var hasFinishedLoading = false;

    function loadSingleImage(name, src) {
      imgPromises.push(new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = src;

        hasFinishedLoading = false;

        try {
          img.onload = function () {
            images.push({ name: name, img: img });
            hasFinishedLoading = true;

            resolve({
              name: name,
              img: img
            });
          };
        } catch (err) {
          reject(err);
        }
      }));
    }

    function loadImages(arr) {
      arr.forEach(function (item) {
        loadSingleImage(item.name, item.src);
      });
    }

    function imagesOnLoad(callback) {
      // callback(arr)
      Promise.all(imgPromises).then(callback);
    }

    function getImages() {
      if (hasFinishedLoading) {
        return images;
      } else {
        throw console.warn('Image hasn\'t finished loading. You may use getImages() in the callback of the imagesOnLoad function.');
      }
    }

    return {
      loadSingleImage: loadSingleImage,
      loadImages: loadImages,
      getImages: getImages,
      imagesOnLoad: imagesOnLoad
    };
  }

  module.exports = createImageCache;

  /***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  /**
   * @author jegood, Chang
   * todo: path should be more flexible and more capable of error handling
   * @param {String} path, which matches the regex pattern below
   */

  function createAudioManager(path) {
    // path: ./src/
    var audios = {};

    function addSingleAudio(key, filename) {
      return audios[key] || (audios[key] = filename);
    }

    function loadAudios(audios) {
      for (var key in audios) {
        addSingleAudio(key, audios[key]);
      }
    }

    // todo: buggy
    function getAudioByName(name) {
      var file = "" + path + name;
      return audios.find(function (a) {
        var src = a.src;

        return src === file;
      });
    }

    return {
      addSingleAudio: addSingleAudio,
      loadAudios: loadAudios,
      getAudioByName: getAudioByName
    };
  }

  module.exports = createAudioManager;

  /***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createDnD;

  /**
   * @author Chang
   */
  var _require = __webpack_require__(1)(),
      getBoundaries = _require.getBoundaries;

  /**
   * drag and drop in canvas is much different than in DOM, because the canvas comes
   * as a whole, so these functions may seem to be hacky, or dirty.
   */

  function createDnD() {
    var getDraggingItemIndex = function getDraggingItemIndex(items, x, y) {
      for (var i = 0; i < items.length; i++) {
        var currItem = items[i];

        var _getBoundaries = getBoundaries(currItem.position, currItem.size),
            top = _getBoundaries.top,
            left = _getBoundaries.left,
            right = _getBoundaries.right,
            bottom = _getBoundaries.bottom;

        if (x < right && x > left && y < bottom && y > top) {
          return i;
        }
      }
      return -1;
    };

    // todo: add further wrapped apis, like sprite.draggable()

    var isCollapsed = function isCollapsed(items, draggingIndex) {
      // check if the `draggingIndex`th of items overlaps any one of the rest elements
      if (draggingIndex < 0 || items.length === 0) return;

      var dragging = items[draggingIndex];

      var _dragging$position = dragging.position,
          x = _dragging$position.x,
          y = _dragging$position.y;

      var center = {
        x: x + dragging.size.width / 2,
        y: y + dragging.size.height / 2
      };

      for (var i = 0; i < items.length; i++) {
        if (i === draggingIndex) continue;

        var _getBoundaries2 = getBoundaries(items[i].position, items[i].size),
            top = _getBoundaries2.top,
            right = _getBoundaries2.right,
            left = _getBoundaries2.left,
            bottom = _getBoundaries2.bottom;

        if (center.x < right && center.x > left && center.y < bottom && center.y > top) {
          return i;
        }
      }
      return -1;
    };

    return {
      isCollapsed: isCollapsed,
      getDraggingItemIndex: getDraggingItemIndex
    };
  }

  /***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  function removeMultiElementFromArray(arr) {
    for (var _len = arguments.length, indexes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      indexes[_key - 1] = arguments[_key];
    }

    indexes.sort(function (a, b) {
      return b - a;
    }); // decendent
    for (var i = 0; i < indexes.length; i++) {
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
    return { x: x + 0.5 * width, y: y + 0.5 * height };
  }

  module.exports = function () {
    removeMultiElementFromArray, getRandomInt, getDistance, calculateCenter;
  };

  /***/
},
/* 8 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  function createKeyBus(target) {
    var simulDownListeners = {};
    var isMultiKey = false;
    var keyhash = null;

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
        remove: function remove() {
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
        remove: function remove() {
          target.removeEventListener('keyup', keyupHandler);
        }
      };
    }

    function simulDown(keyCode, cb) {
      simulDownListeners[keyCode] ? simulDownListeners[keyCode] = [cb] : simulDownListeners[keyCode].push(cb);

      function updateKeyhash(e, val) {
        if (e.keyCode === keyCode) {
          e.preventDefault();
          keyhash[keyCode] = val;
        }
      }

      var keydownUpdate = function keydownUpdate(e) {
        return updateKeyhash(e, true);
      };
      var keyupUpdate = function keyupUpdate(e) {
        return updateKeyhash(e, false);
      };

      target.addEventListener('keydown', keydownUpdate);
      target.addEventListener('keyup', keyupUpdate);

      return {
        remove: function remove() {
          simulDownListeners[keyCode].splice(simulDownListeners[keyCode].indexOf(cb), 1);

          target.removeEventListener('keydown', keydownUpdate);
          target.removeEventListener('keyup', keyupUpdate);
        }
      };
    }

    function executeMultiKeyHandlers() {
      for (var key in simulDownListeners) {
        if (keyhash[key]) {
          simulDownListeners[key].forEach(function (cb) {
            cb();
          });
        }
      }
    }
  }

  module.exports = createKeyBus;

  /***/
},
/* 9 */
/***/function (module, exports) {

  module.exports = function () {
    throw new Error("define cannot be used indirect");
  };

  /***/
},
/* 10 */
/***/function (module, exports) {

  /* WEBPACK VAR INJECTION */(function (__webpack_amd_options__) {
    /* globals __webpack_amd_options__ */
    module.exports = __webpack_amd_options__;

    /* WEBPACK VAR INJECTION */
  }).call(exports, {});

  /***/
},
/* 11 */
/***/function (module, exports, __webpack_require__) {

  "use strict";

  var _typeof4 = typeof Symbol === "function" && _typeof5(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === 'undefined' ? 'undefined' : _typeof5(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof5(obj);
  };

  /******/(function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/var installedModules = {};
    /******/
    /******/ // The require function
    /******/function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/if (installedModules[moduleId]) {
        /******/return installedModules[moduleId].exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/var module = installedModules[moduleId] = {
        /******/i: moduleId,
        /******/l: false,
        /******/exports: {}
        /******/ };
      /******/
      /******/ // Execute the module function
      /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Flag the module as loaded
      /******/module.l = true;
      /******/
      /******/ // Return the exports of the module
      /******/return module.exports;
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/__webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/__webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/__webpack_require__.d = function (exports, name, getter) {
      /******/if (!__webpack_require__.o(exports, name)) {
        /******/Object.defineProperty(exports, name, {
          /******/configurable: false,
          /******/enumerable: true,
          /******/get: getter
          /******/ });
        /******/
      }
      /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/__webpack_require__.n = function (module) {
      /******/var getter = module && module.__esModule ?
      /******/function getDefault() {
        return module['default'];
      } :
      /******/function getModuleExports() {
        return module;
      };
      /******/__webpack_require__.d(getter, 'a', getter);
      /******/return getter;
      /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/__webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/__webpack_require__.p = "";
    /******/
    /******/ // Load entry module and return exports
    /******/return __webpack_require__(__webpack_require__.s = 2);
    /******/
  })(
  /************************************************************************/
  /******/[
  /* 0 */
  /***/function (module, exports, __webpack_require__) {

    "use strict";
    /* WEBPACK VAR INJECTION */

    (function (global) {
      var __WEBPACK_AMD_DEFINE_RESULT__;

      var _typeof = typeof Symbol === "function" && _typeof4(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof4(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof4(obj);
      };

      /**
       * @author Chang
       */
      // const createComponents = require('./components/index');
      // const createIO = require('./network');
      var createCanvasUtils = __webpack_require__(1);
      var createAudioManager = __webpack_require__(5);
      var createDnD = __webpack_require__(6);
      var createUtils = __webpack_require__(7);
      var createKeyBus = __webpack_require__(8);

      (function (root) {
        var zion = {
          // createComponents,
          createUtils: createUtils,
          // createIO,
          createKeyBus: createKeyBus,
          createAudioManager: createAudioManager,
          createCanvasUtils: createCanvasUtils,
          createDnD: createDnD
        };

        if ((false ? 'undefined' : _typeof(exports)) === 'object') {
          module.exports = zion;
          /* eslint-disable no-undef */
        } else if (__webpack_require__(9) && "function" === 'function' && __webpack_require__(10)) {
          /* eslint-disable no-undef */
          !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return root.zion = zion;
          }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {
          root.zion = zion;
        }
      })((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window : global);
      /* WEBPACK VAR INJECTION */
    }).call(exports, __webpack_require__(3));

    /***/
  },
  /* 1 */
  /***/function (module, exports, __webpack_require__) {

    "use strict";

    /**
     * @author Chang
     */

    var createImageCache = __webpack_require__(4);

    function clearCanvas(canvas, context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function coordinateConversion(canvas, x, y) {
      var box = canvas.getBoundingRect();
      return {
        x: Math.round(x - box.left),
        y: Math.round(y - box.right)
      };
    }

    function getBoundaries(pos, size) {
      var x = pos.x,
          y = pos.y;
      var width = size.width,
          height = size.height;

      return {
        top: y,
        left: x,
        bottom: y + height,
        right: x + width
      };
    }

    function generateRandomPosition(canvas) {
      var middle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var size = arguments[2];

      var x = void 0,
          y = void 0;
      var getRandomNumBetween = function getRandomNumBetween(min, max) {
        return Math.random() * (max - min) + min;
      };
      var width = size.width,
          height = size.height;

      if (middle) {
        x = Math.round(getRandomNumBetween(canvas.width * 0.2, canvas.width * 0.8 - width));
        y = Math.round(getRandomNumBetween(canvas.height * 0.2, canvas.height * 0.8 - height));
      } else {
        x = Math.round(getRandomNumBetween(0, canvas.width - width));
        y = Math.round(getRandomNumBetween(0, canvas.height - height));
      }
      return { x: x, y: y };
    }

    function drawRotate(context, _ref) {
      var img = _ref.img,
          x = _ref.x,
          y = _ref.y,
          degrees = _ref.degrees,
          effect = _ref.effect;

      context.save();
      context.translate(x + img.width / 2, y + img.height / 2);
      context.rotate(degrees * Math.PI / 180);
      context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
      if (!effect) {
        var row = Math.floor(effect.currentFrame / effect.numFrames);
        var col = Math.floor(effect.currentFrame % effect.numFrames);
        context.drawImage(effect.img, col * effect.frameWidth, row * effect.frameHeight, effect.frameWidth, effect.frameHeight, -img.width / 2 + effect.offset.x, -img.height / 2 + effect.offset.y, effect.frameWidth, effect.frameHeight);
      }
      context.restore();
    }

    function insertText(context) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var text = options.text,
          font = options.font,
          _options$position = options.position,
          x = _options$position.x,
          y = _options$position.y,
          color = options.color;

      context.fillStyle = color;
      context.font = font;

      context.fillText(text, x, y);
    }

    module.exports = function () {
      clearCanvas, coordinateConversion, getBoundaries, generateRandomPosition, createImageCache, drawRotate, insertText;
    };

    /***/
  },
  /* 2 */
  /***/function (module, exports, __webpack_require__) {

    __webpack_require__(0);
    __webpack_require__(0);
    module.exports = __webpack_require__(11);

    /***/
  },
  /* 3 */
  /***/function (module, exports) {

    var g;

    // This works in non-strict mode
    g = function () {
      return this;
    }();

    try {
      // This works if eval is allowed (see CSP)
      g = g || Function("return this")() || (1, eval)("this");
    } catch (e) {
      // This works if the window reference is available
      if ((typeof window === 'undefined' ? 'undefined' : _typeof4(window)) === "object") g = window;
    }

    // g can still be undefined, but nothing to do about it...
    // We return undefined, instead of nothing here, so it's
    // easier to handle this case. if(!global) { ...}

    module.exports = g;

    /***/
  },
  /* 4 */
  /***/function (module, exports) {

    function createImageCache() {
      var images = [];
      var imgPromises = [];
      var hasFinishedLoading = false;

      function loadSingleImage(name, src) {
        imgPromises.push(new Promise(function (resolve, reject) {
          var img = new Image();
          img.src = src;

          hasFinishedLoading = false;

          try {
            img.onload = function () {
              images.push({ name: name, img: img });
              hasFinishedLoading = true;

              resolve({
                name: name,
                img: img
              });
            };
          } catch (err) {
            reject(err);
          }
        }));
      }

      function loadImages(arr) {
        arr.forEach(function (item) {
          loadSingleImage(item.name, item.src);
        });
      }

      function imagesOnLoad(callback) {
        // callback(arr)
        Promise.all(imgPromises).then(callback);
      }

      function getImages() {
        if (hasFinishedLoading) {
          return images;
        } else {
          throw console.warn('Image hasn\'t finished loading. You may use getImages() in the callback of the imagesOnLoad function.');
        }
      }

      return {
        loadSingleImage: loadSingleImage,
        loadImages: loadImages,
        getImages: getImages,
        imagesOnLoad: imagesOnLoad
      };
    }

    module.exports = createImageCache;

    /***/
  },
  /* 5 */
  /***/function (module, exports, __webpack_require__) {

    "use strict";

    /**
     * @author jegood, Chang
     * todo: path should be more flexible and more capable of error handling
     * @param {String} path, which matches the regex pattern below
     */

    function createAudioManager(path) {
      // path: ./src/
      var audios = {};

      function addSingleAudio(key, filename) {
        return audios[key] || (audios[key] = filename);
      }

      function loadAudios(audios) {
        for (var key in audios) {
          addSingleAudio(key, audios[key]);
        }
      }

      // todo: buggy
      function getAudioByName(name) {
        var file = "" + path + name;
        return audios.find(function (a) {
          var src = a.src;

          return src === file;
        });
      }

      return {
        addSingleAudio: addSingleAudio,
        loadAudios: loadAudios,
        getAudioByName: getAudioByName
      };
    }

    module.exports = createAudioManager;

    /***/
  },
  /* 6 */
  /***/function (module, exports, __webpack_require__) {

    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = createDnD;

    /**
     * @author Chang
     */
    var _require = __webpack_require__(1)(),
        getBoundaries = _require.getBoundaries;

    /**
     * drag and drop in canvas is much different than in DOM, because the canvas comes
     * as a whole, so these functions may seem to be hacky, or dirty.
     */

    function createDnD() {
      var getDraggingItemIndex = function getDraggingItemIndex(items, x, y) {
        for (var i = 0; i < items.length; i++) {
          var currItem = items[i];

          var _getBoundaries = getBoundaries(currItem.position, currItem.size),
              top = _getBoundaries.top,
              left = _getBoundaries.left,
              right = _getBoundaries.right,
              bottom = _getBoundaries.bottom;

          if (x < right && x > left && y < bottom && y > top) {
            return i;
          }
        }
        return -1;
      };

      // todo: add further wrapped apis, like sprite.draggable()

      var isCollapsed = function isCollapsed(items, draggingIndex) {
        // check if the `draggingIndex`th of items overlaps any one of the rest elements
        if (draggingIndex < 0 || items.length === 0) return;

        var dragging = items[draggingIndex];

        var _dragging$position = dragging.position,
            x = _dragging$position.x,
            y = _dragging$position.y;

        var center = {
          x: x + dragging.size.width / 2,
          y: y + dragging.size.height / 2
        };

        for (var i = 0; i < items.length; i++) {
          if (i === draggingIndex) continue;

          var _getBoundaries2 = getBoundaries(items[i].position, items[i].size),
              top = _getBoundaries2.top,
              right = _getBoundaries2.right,
              left = _getBoundaries2.left,
              bottom = _getBoundaries2.bottom;

          if (center.x < right && center.x > left && center.y < bottom && center.y > top) {
            return i;
          }
        }
        return -1;
      };

      return {
        isCollapsed: isCollapsed,
        getDraggingItemIndex: getDraggingItemIndex
      };
    }

    /***/
  },
  /* 7 */
  /***/function (module, exports, __webpack_require__) {

    "use strict";

    function removeMultiElementFromArray(arr) {
      for (var _len = arguments.length, indexes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        indexes[_key - 1] = arguments[_key];
      }

      indexes.sort(function (a, b) {
        return b - a;
      }); // decendent
      for (var i = 0; i < indexes.length; i++) {
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
      return { x: x + 0.5 * width, y: y + 0.5 * height };
    }

    module.exports = function () {
      removeMultiElementFromArray, getRandomInt, getDistance, calculateCenter;
    };

    /***/
  },
  /* 8 */
  /***/function (module, exports) {

    throw new Error('Module build failed: SyntaxError: Unexpected token, expected ; (46:18)\n\n\x1B[0m \x1B[90m 44 | \x1B[39m  }\n \x1B[90m 45 | \x1B[39m\n\x1B[31m\x1B[1m>\x1B[22m\x1B[39m\x1B[90m 46 | \x1B[39m  up(keyCode\x1B[33m,\x1B[39m cb) {\n \x1B[90m    | \x1B[39m                  \x1B[31m\x1B[1m^\x1B[22m\x1B[39m\n \x1B[90m 47 | \x1B[39m    \x1B[36mif\x1B[39m (enableMultiKey) {\n \x1B[90m 48 | \x1B[39m      \x1B[36mthrow\x1B[39m \x1B[33mError\x1B[39m(\x1B[32m\'multikey handlers should not use the "on" method of KeyBus\'\x1B[39m)\n \x1B[90m 49 | \x1B[39m      \x1B[36mreturn\x1B[39m\x1B[0m\n');

    /***/
  },
  /* 9 */
  /***/function (module, exports) {

    module.exports = function () {
      throw new Error("define cannot be used indirect");
    };

    /***/
  },
  /* 10 */
  /***/function (module, exports) {

    /* WEBPACK VAR INJECTION */(function (__webpack_amd_options__) {
      /* globals __webpack_amd_options__ */
      module.exports = __webpack_amd_options__;

      /* WEBPACK VAR INJECTION */
    }).call(exports, {});

    /***/
  },
  /* 11 */
  /***/function (module, exports, __webpack_require__) {

    "use strict";

    var _typeof3 = typeof Symbol === "function" && _typeof4(Symbol.iterator) === "symbol" ? function (obj) {
      return typeof obj === 'undefined' ? 'undefined' : _typeof4(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof4(obj);
    };

    /******/(function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 2);
      /******/
    })(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* WEBPACK VAR INJECTION */

      (function (global) {
        var __WEBPACK_AMD_DEFINE_RESULT__;

        var _typeof = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
          return typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
        };

        /**
         * @author Chang
         */
        // const createComponents = require('./components/index');
        // const createIO = require('./network');
        var createCanvasUtils = __webpack_require__(1);
        var createAudioManager = __webpack_require__(5);
        var createDnD = __webpack_require__(6);
        var createUtils = __webpack_require__(7);
        var createKeyBus = __webpack_require__(8);

        (function (root) {
          var zion = {
            // createComponents,
            createUtils: createUtils,
            // createIO,
            createKeyBus: createKeyBus,
            createAudioManager: createAudioManager,
            createCanvasUtils: createCanvasUtils,
            createDnD: createDnD
          };

          if ((false ? 'undefined' : _typeof(exports)) === 'object') {
            module.exports = zion;
            /* eslint-disable no-undef */
          } else if (__webpack_require__(10) && "function" === 'function' && __webpack_require__(11)) {
            /* eslint-disable no-undef */
            !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
              return root.zion = zion;
            }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
          } else {
            root.zion = zion;
          }
        })((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window : global);
        /* WEBPACK VAR INJECTION */
      }).call(exports, __webpack_require__(3));

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      /**
       * @author Chang
       */

      var createImageCache = __webpack_require__(4);

      function clearCanvas(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      function coordinateConversion(canvas, x, y) {
        var box = canvas.getBoundingRect();
        return {
          x: Math.round(x - box.left),
          y: Math.round(y - box.right)
        };
      }

      function getBoundaries(pos, size) {
        var x = pos.x,
            y = pos.y;
        var width = size.width,
            height = size.height;

        return {
          top: y,
          left: x,
          bottom: y + height,
          right: x + width
        };
      }

      function generateRandomPosition(canvas) {
        var middle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var size = arguments[2];

        var x = void 0,
            y = void 0;
        var getRandomNumBetween = function getRandomNumBetween(min, max) {
          return Math.random() * (max - min) + min;
        };
        var width = size.width,
            height = size.height;

        if (middle) {
          x = Math.round(getRandomNumBetween(canvas.width * 0.2, canvas.width * 0.8 - width));
          y = Math.round(getRandomNumBetween(canvas.height * 0.2, canvas.height * 0.8 - height));
        } else {
          x = Math.round(getRandomNumBetween(0, canvas.width - width));
          y = Math.round(getRandomNumBetween(0, canvas.height - height));
        }
        return { x: x, y: y };
      }

      function drawRotate(context, _ref) {
        var img = _ref.img,
            x = _ref.x,
            y = _ref.y,
            degrees = _ref.degrees,
            effect = _ref.effect;

        context.save();
        context.translate(x + img.width / 2, y + img.height / 2);
        context.rotate(degrees * Math.PI / 180);
        context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
        if (!effect) {
          var row = Math.floor(effect.currentFrame / effect.numFrames);
          var col = Math.floor(effect.currentFrame % effect.numFrames);
          context.drawImage(effect.img, col * effect.frameWidth, row * effect.frameHeight, effect.frameWidth, effect.frameHeight, -img.width / 2 + effect.offset.x, -img.height / 2 + effect.offset.y, effect.frameWidth, effect.frameHeight);
        }
        context.restore();
      }

      function insertText(context) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var text = options.text,
            font = options.font,
            _options$position = options.position,
            x = _options$position.x,
            y = _options$position.y,
            color = options.color;

        context.fillStyle = color;
        context.font = font;

        context.fillText(text, x, y);
      }

      module.exports = function () {
        clearCanvas, coordinateConversion, getBoundaries, generateRandomPosition, createImageCache, drawRotate, insertText;
      };

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      __webpack_require__(0);
      __webpack_require__(0);
      module.exports = __webpack_require__(12);

      /***/
    },
    /* 3 */
    /***/function (module, exports) {

      var g;

      // This works in non-strict mode
      g = function () {
        return this;
      }();

      try {
        // This works if eval is allowed (see CSP)
        g = g || Function("return this")() || (1, eval)("this");
      } catch (e) {
        // This works if the window reference is available
        if ((typeof window === 'undefined' ? 'undefined' : _typeof3(window)) === "object") g = window;
      }

      // g can still be undefined, but nothing to do about it...
      // We return undefined, instead of nothing here, so it's
      // easier to handle this case. if(!global) { ...}

      module.exports = g;

      /***/
    },
    /* 4 */
    /***/function (module, exports) {

      function createImageCache() {
        var images = [];
        var imgPromises = [];
        var hasFinishedLoading = false;

        function loadSingleImage(name, src) {
          imgPromises.push(new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = src;

            hasFinishedLoading = false;

            try {
              img.onload = function () {
                images.push({ name: name, img: img });
                hasFinishedLoading = true;

                resolve({
                  name: name,
                  img: img
                });
              };
            } catch (err) {
              reject(err);
            }
          }));
        }

        function loadImages(arr) {
          arr.forEach(function (item) {
            loadSingleImage(item.name, item.src);
          });
        }

        function imagesOnLoad(callback) {
          // callback(arr)
          Promise.all(imgPromises).then(callback);
        }

        function getImages() {
          if (hasFinishedLoading) {
            return images;
          } else {
            throw console.warn('Image hasn\'t finished loading. You may use getImages() in the callback of the imagesOnLoad function.');
          }
        }

        return {
          loadSingleImage: loadSingleImage,
          loadImages: loadImages,
          getImages: getImages,
          imagesOnLoad: imagesOnLoad
        };
      }

      module.exports = createImageCache;

      /***/
    },
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      /**
       * @author jegood, Chang
       * todo: path should be more flexible and more capable of error handling
       * @param {String} path, which matches the regex pattern below
       */

      function createAudioManager(path) {
        // path: ./src/
        var audios = {};

        function addSingleAudio(key, filename) {
          return audios[key] || (audios[key] = filename);
        }

        function loadAudios(audios) {
          for (var key in audios) {
            addSingleAudio(key, audios[key]);
          }
        }

        // todo: buggy
        function getAudioByName(name) {
          var file = "" + path + name;
          return audios.find(function (a) {
            var src = a.src;

            return src === file;
          });
        }

        return {
          addSingleAudio: addSingleAudio,
          loadAudios: loadAudios,
          getAudioByName: getAudioByName
        };
      }

      module.exports = createAudioManager;

      /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = createDnD;

      /**
       * @author Chang
       */
      var _require = __webpack_require__(1)(),
          getBoundaries = _require.getBoundaries;

      /**
       * drag and drop in canvas is much different than in DOM, because the canvas comes
       * as a whole, so these functions may seem to be hacky, or dirty.
       */

      function createDnD() {
        var getDraggingItemIndex = function getDraggingItemIndex(items, x, y) {
          for (var i = 0; i < items.length; i++) {
            var currItem = items[i];

            var _getBoundaries = getBoundaries(currItem.position, currItem.size),
                top = _getBoundaries.top,
                left = _getBoundaries.left,
                right = _getBoundaries.right,
                bottom = _getBoundaries.bottom;

            if (x < right && x > left && y < bottom && y > top) {
              return i;
            }
          }
          return -1;
        };

        // todo: add further wrapped apis, like sprite.draggable()

        var isCollapsed = function isCollapsed(items, draggingIndex) {
          // check if the `draggingIndex`th of items overlaps any one of the rest elements
          if (draggingIndex < 0 || items.length === 0) return;

          var dragging = items[draggingIndex];

          var _dragging$position = dragging.position,
              x = _dragging$position.x,
              y = _dragging$position.y;

          var center = {
            x: x + dragging.size.width / 2,
            y: y + dragging.size.height / 2
          };

          for (var i = 0; i < items.length; i++) {
            if (i === draggingIndex) continue;

            var _getBoundaries2 = getBoundaries(items[i].position, items[i].size),
                top = _getBoundaries2.top,
                right = _getBoundaries2.right,
                left = _getBoundaries2.left,
                bottom = _getBoundaries2.bottom;

            if (center.x < right && center.x > left && center.y < bottom && center.y > top) {
              return i;
            }
          }
          return -1;
        };

        return {
          isCollapsed: isCollapsed,
          getDraggingItemIndex: getDraggingItemIndex
        };
      }

      /***/
    },
    /* 7 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      function removeMultiElementFromArray(arr) {
        for (var _len = arguments.length, indexes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          indexes[_key - 1] = arguments[_key];
        }

        indexes.sort(function (a, b) {
          return b - a;
        }); // decendent
        for (var i = 0; i < indexes.length; i++) {
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
        return { x: x + 0.5 * width, y: y + 0.5 * height };
      }

      module.exports = function () {
        removeMultiElementFromArray, getRandomInt, getDistance, calculateCenter;
      };

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var createKeyBus = __webpack_require__(9);

      module.exports = createKeyBus;

      /***/
    },
    /* 9 */
    /***/function (module, exports) {

      throw new Error("Module parse failed: Unexpected token (46:18)\nYou may need an appropriate loader to handle this file type.\n|   }\n| \n|   up(keyCode, cb) {\n|     if (enableMultiKey) {\n|       throw Error('multikey handlers should not use the \"on\" method of KeyBus')");

      /***/
    },
    /* 10 */
    /***/function (module, exports) {

      module.exports = function () {
        throw new Error("define cannot be used indirect");
      };

      /***/
    },
    /* 11 */
    /***/function (module, exports) {

      /* WEBPACK VAR INJECTION */(function (__webpack_amd_options__) {
        /* globals __webpack_amd_options__ */
        module.exports = __webpack_amd_options__;

        /* WEBPACK VAR INJECTION */
      }).call(exports, {});

      /***/
    },
    /* 12 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
      };

      /******/(function (modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/var installedModules = {};
        /******/
        /******/ // The require function
        /******/function __webpack_require__(moduleId) {
          /******/
          /******/ // Check if module is in cache
          /******/if (installedModules[moduleId]) {
            /******/return installedModules[moduleId].exports;
            /******/
          }
          /******/ // Create a new module (and put it into the cache)
          /******/var module = installedModules[moduleId] = {
            /******/i: moduleId,
            /******/l: false,
            /******/exports: {}
            /******/ };
          /******/
          /******/ // Execute the module function
          /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          /******/
          /******/ // Flag the module as loaded
          /******/module.l = true;
          /******/
          /******/ // Return the exports of the module
          /******/return module.exports;
          /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/__webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/__webpack_require__.c = installedModules;
        /******/
        /******/ // define getter function for harmony exports
        /******/__webpack_require__.d = function (exports, name, getter) {
          /******/if (!__webpack_require__.o(exports, name)) {
            /******/Object.defineProperty(exports, name, {
              /******/configurable: false,
              /******/enumerable: true,
              /******/get: getter
              /******/ });
            /******/
          }
          /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/__webpack_require__.n = function (module) {
          /******/var getter = module && module.__esModule ?
          /******/function getDefault() {
            return module['default'];
          } :
          /******/function getModuleExports() {
            return module;
          };
          /******/__webpack_require__.d(getter, 'a', getter);
          /******/return getter;
          /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/__webpack_require__.o = function (object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/__webpack_require__.p = '';
        /******/
        /******/ // Load entry module and return exports
        /******/return __webpack_require__(__webpack_require__.s = 2);
        /******/
      })(
      /************************************************************************/
      /******/[
      /* 0 */
      /***/function (module, exports, __webpack_require__) {

        'use strict';
        /* WEBPACK VAR INJECTION */

        (function (global) {
          var __WEBPACK_AMD_DEFINE_RESULT__;

          var _typeof = typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol' ? function (obj) {
            return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
          } : function (obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
          };

          /**
          * @author Chang
          */
          // const createComponents = require('./components/index');
          // const createIO = require('./network');
          var createCanvasUtils = __webpack_require__(1);
          var createAudioManager = __webpack_require__(5);
          var createDnD = __webpack_require__(6);
          var createUtils = __webpack_require__(7);
          var createKeyBus = __webpack_require__(8);

          (function (root) {
            var zion = {
              // createComponents,
              createUtils: createUtils,
              // createIO,
              createKeyBus: createKeyBus,
              createAudioManager: createAudioManager,
              createCanvasUtils: createCanvasUtils,
              createDnD: createDnD
            };

            if ((false ? 'undefined' : _typeof(exports)) === 'object') {
              module.exports = zion;
              /* eslint-disable no-undef */
            } else if (__webpack_require__(10) && 'function' === 'function' && __webpack_require__(11)) {
              /* eslint-disable no-undef */
              !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return root.zion = zion;
              }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else {
              root.zion = zion;
            }
          })((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window : global);
          /* WEBPACK VAR INJECTION */
        }).call(exports, __webpack_require__(3));

        /***/
      },
      /* 1 */
      /***/function (module, exports, __webpack_require__) {

        'use strict';

        /**
        * @author Chang
        */

        var createImageCache = __webpack_require__(4);

        function clearCanvas(canvas, context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }

        function coordinateConversion(canvas, x, y) {
          var box = canvas.getBoundingRect();
          return {
            x: Math.round(x - box.left),
            y: Math.round(y - box.right)
          };
        }

        function getBoundaries(pos, size) {
          var x = pos.x,
              y = pos.y;
          var width = size.width,
              height = size.height;

          return {
            top: y,
            left: x,
            bottom: y + height,
            right: x + width
          };
        }

        function generateRandomPosition(canvas) {
          var middle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var size = arguments[2];

          var x = void 0,
              y = void 0;
          var getRandomNumBetween = function getRandomNumBetween(min, max) {
            return Math.random() * (max - min) + min;
          };
          var width = size.width,
              height = size.height;

          if (middle) {
            x = Math.round(getRandomNumBetween(canvas.width * 0.2, canvas.width * 0.8 - width));
            y = Math.round(getRandomNumBetween(canvas.height * 0.2, canvas.height * 0.8 - height));
          } else {
            x = Math.round(getRandomNumBetween(0, canvas.width - width));
            y = Math.round(getRandomNumBetween(0, canvas.height - height));
          }
          return { x: x, y: y };
        }

        function drawRotate(context, _ref) {
          var img = _ref.img,
              x = _ref.x,
              y = _ref.y,
              degrees = _ref.degrees,
              effect = _ref.effect;

          context.save();
          context.translate(x + img.width / 2, y + img.height / 2);
          context.rotate(degrees * Math.PI / 180);
          context.drawImage(img, 0, 0, img.width, img.height, -img.width / 2, -img.height / 2, img.width, img.height);
          if (!effect) {
            var row = Math.floor(effect.currentFrame / effect.numFrames);
            var col = Math.floor(effect.currentFrame % effect.numFrames);
            context.drawImage(effect.img, col * effect.frameWidth, row * effect.frameHeight, effect.frameWidth, effect.frameHeight, -img.width / 2 + effect.offset.x, -img.height / 2 + effect.offset.y, effect.frameWidth, effect.frameHeight);
          }
          context.restore();
        }

        function insertText(context) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var text = options.text,
              font = options.font,
              _options$position = options.position,
              x = _options$position.x,
              y = _options$position.y,
              color = options.color;

          context.fillStyle = color;
          context.font = font;

          context.fillText(text, x, y);
        }

        module.exports = function () {
          clearCanvas, coordinateConversion, getBoundaries, generateRandomPosition, createImageCache, drawRotate, insertText;
        };

        /***/
      },
      /* 2 */
      /***/function (module, exports, __webpack_require__) {

        __webpack_require__(0);
        __webpack_require__(0);
        module.exports = __webpack_require__(12);

        /***/
      },
      /* 3 */
      /***/function (module, exports) {

        var g;

        // This works in non-strict mode
        g = function () {
          return this;
        }();

        try {
          // This works if eval is allowed (see CSP)
          g = g || Function('return this')() || (1, eval)('this');
        } catch (e) {
          // This works if the window reference is available
          if ((typeof window === 'undefined' ? 'undefined' : _typeof2(window)) === 'object') g = window;
        }

        // g can still be undefined, but nothing to do about it...
        // We return undefined, instead of nothing here, so it's
        // easier to handle this case. if(!global) { ...}

        module.exports = g;

        /***/
      },
      /* 4 */
      /***/function (module, exports) {

        function createImageCache() {
          var images = [];
          var imgPromises = [];
          var hasFinishedLoading = false;

          function loadSingleImage(name, src) {
            imgPromises.push(new Promise(function (resolve, reject) {
              var img = new Image();
              img.src = src;

              hasFinishedLoading = false;

              try {
                img.onload = function () {
                  images.push({ name: name, img: img });
                  hasFinishedLoading = true;

                  resolve({
                    name: name,
                    img: img
                  });
                };
              } catch (err) {
                reject(err);
              }
            }));
          }

          function loadImages(arr) {
            arr.forEach(function (item) {
              loadSingleImage(item.name, item.src);
            });
          }

          function imagesOnLoad(callback) {
            // callback(arr)
            Promise.all(imgPromises).then(callback);
          }

          function getImages() {
            if (hasFinishedLoading) {
              return images;
            } else {
              throw console.warn('Image hasn\'t finished loading. You may use getImages() in the callback of the imagesOnLoad function.');
            }
          }

          return {
            loadSingleImage: loadSingleImage,
            loadImages: loadImages,
            getImages: getImages,
            imagesOnLoad: imagesOnLoad
          };
        }

        module.exports = createImageCache;

        /***/
      },
      /* 5 */
      /***/function (module, exports, __webpack_require__) {

        'use strict';

        /**
        * @author jegood, Chang
        * todo: path should be more flexible and more capable of error handling
        * @param {String} path, which matches the regex pattern below
        */

        function createAudioManager(path) {
          // path: ./src/
          var audios = {};

          function addSingleAudio(key, filename) {
            return audios[key] || (audios[key] = filename);
          }

          function loadAudios(audios) {
            for (var key in audios) {
              addSingleAudio(key, audios[key]);
            }
          }

          // todo: buggy
          function getAudioByName(name) {
            var file = '' + path + name;
            return audios.find(function (a) {
              var src = a.src;

              return src === file;
            });
          }

          return {
            addSingleAudio: addSingleAudio,
            loadAudios: loadAudios,
            getAudioByName: getAudioByName
          };
        }

        module.exports = createAudioManager;

        /***/
      },
      /* 6 */
      /***/function (module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        exports.default = createDnD;

        /**
        * @author Chang
        */
        var _require = __webpack_require__(1)(),
            getBoundaries = _require.getBoundaries;

        /**
        * drag and drop in canvas is much different than in DOM, because the canvas comes
        * as a whole, so these functions may seem to be hacky, or dirty.
        */

        function createDnD() {
          var getDraggingItemIndex = function getDraggingItemIndex(items, x, y) {
            for (var i = 0; i < items.length; i++) {
              var currItem = items[i];

              var _getBoundaries = getBoundaries(currItem.position, currItem.size),
                  top = _getBoundaries.top,
                  left = _getBoundaries.left,
                  right = _getBoundaries.right,
                  bottom = _getBoundaries.bottom;

              if (x < right && x > left && y < bottom && y > top) {
                return i;
              }
            }
            return -1;
          };

          // todo: add further wrapped apis, like sprite.draggable()

          var isCollapsed = function isCollapsed(items, draggingIndex) {
            // check if the `draggingIndex`th of items overlaps any one of the rest elements
            if (draggingIndex < 0 || items.length === 0) return;

            var dragging = items[draggingIndex];

            var _dragging$position = dragging.position,
                x = _dragging$position.x,
                y = _dragging$position.y;

            var center = {
              x: x + dragging.size.width / 2,
              y: y + dragging.size.height / 2
            };

            for (var i = 0; i < items.length; i++) {
              if (i === draggingIndex) continue;

              var _getBoundaries2 = getBoundaries(items[i].position, items[i].size),
                  top = _getBoundaries2.top,
                  right = _getBoundaries2.right,
                  left = _getBoundaries2.left,
                  bottom = _getBoundaries2.bottom;

              if (center.x < right && center.x > left && center.y < bottom && center.y > top) {
                return i;
              }
            }
            return -1;
          };

          return {
            isCollapsed: isCollapsed,
            getDraggingItemIndex: getDraggingItemIndex
          };
        }

        /***/
      },
      /* 7 */
      /***/function (module, exports, __webpack_require__) {

        'use strict';

        function removeMultiElementFromArray(arr) {
          for (var _len = arguments.length, indexes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            indexes[_key - 1] = arguments[_key];
          }

          indexes.sort(function (a, b) {
            return b - a;
          }); // decendent
          for (var i = 0; i < indexes.length; i++) {
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
          return { x: x + 0.5 * width, y: y + 0.5 * height };
        }

        module.exports = function () {
          removeMultiElementFromArray, getRandomInt, getDistance, calculateCenter;
        };

        /***/
      },
      /* 8 */
      /***/function (module, exports, __webpack_require__) {

        'use strict';

        var createKeyBus = __webpack_require__(9);

        module.exports = createKeyBus;

        /***/
      },
      /* 9 */
      /***/function (module, exports) {

        throw new Error('Module parse failed: Unexpected token (46:18)\nYou may need an appropriate loader to handle this file type.\n|   }\n| \n|   up(keyCode, cb) {\n|     if (enableMultiKey) {\n|       throw Error(\'multikey handlers should not use the "on" method of KeyBus\')');

        /***/
      },
      /* 10 */
      /***/function (module, exports) {

        module.exports = function () {
          throw new Error('define cannot be used indirect');
        };

        /***/
      },
      /* 11 */
      /***/function (module, exports) {

        /* WEBPACK VAR INJECTION */(function (__webpack_amd_options__) {
          /* globals __webpack_amd_options__ */
          module.exports = __webpack_amd_options__;

          /* WEBPACK VAR INJECTION */
        }).call(exports, {});

        /***/
      },
      /* 12 */
      /***/function (module, exports, __webpack_require__) {

        'use strict';

        /******/

        (function (modules) {
          // webpackBootstrap
          /******/ // The module cache
          /******/var installedModules = {};
          /******/
          /******/ // The require function
          /******/function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/if (installedModules[moduleId]) {
              /******/return installedModules[moduleId].exports;
              /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/var module = installedModules[moduleId] = {
              /******/i: moduleId,
              /******/l: false,
              /******/exports: {}
              /******/ };
            /******/
            /******/ // Execute the module function
            /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/return module.exports;
            /******/
          }
          /******/
          /******/
          /******/ // expose the modules object (__webpack_modules__)
          /******/__webpack_require__.m = modules;
          /******/
          /******/ // expose the module cache
          /******/__webpack_require__.c = installedModules;
          /******/
          /******/ // define getter function for harmony exports
          /******/__webpack_require__.d = function (exports, name, getter) {
            /******/if (!__webpack_require__.o(exports, name)) {
              /******/Object.defineProperty(exports, name, {
                /******/configurable: false,
                /******/enumerable: true,
                /******/get: getter
                /******/ });
              /******/
            }
            /******/
          };
          /******/
          /******/ // getDefaultExport function for compatibility with non-harmony modules
          /******/__webpack_require__.n = function (module) {
            /******/var getter = module && module.__esModule ?
            /******/function getDefault() {
              return module['default'];
            } :
            /******/function getModuleExports() {
              return module;
            };
            /******/__webpack_require__.d(getter, 'a', getter);
            /******/return getter;
            /******/
          };
          /******/
          /******/ // Object.prototype.hasOwnProperty.call
          /******/__webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          };
          /******/
          /******/ // __webpack_public_path__
          /******/__webpack_require__.p = '';
          /******/
          /******/ // Load entry module and return exports
          /******/return __webpack_require__(__webpack_require__.s = 1);
          /******/
        })(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports) {

          throw new Error('Module build failed: SyntaxError: /Users/changyan/Documents/repos/zion/.babelrc: Error while parsing JSON - Unexpected EOF at line 1 column 2 of the JSON5 data. Still to read: ""\n    at error (/Users/changyan/Documents/repos/zion/node_modules/json5/lib/json5.js:56:25)\n    at word (/Users/changyan/Documents/repos/zion/node_modules/json5/lib/json5.js:393:13)\n    at value (/Users/changyan/Documents/repos/zion/node_modules/json5/lib/json5.js:493:56)\n    at Object.parse (/Users/changyan/Documents/repos/zion/node_modules/json5/lib/json5.js:508:18)\n    at ConfigChainBuilder.addConfig (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:150:65)\n    at ConfigChainBuilder.findConfigs (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:96:16)\n    at buildConfigChain (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:61:13)\n    at OptionManager.init (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/options/option-manager.js:354:58)\n    at File.initOptions (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/index.js:212:65)\n    at new File (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/index.js:135:24)\n    at Pipeline.transform (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/pipeline.js:46:16)\n    at transpile (/Users/changyan/Documents/repos/zion/node_modules/babel-loader/lib/index.js:50:20)\n    at Object.module.exports (/Users/changyan/Documents/repos/zion/node_modules/babel-loader/lib/index.js:175:20)');

          /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

          __webpack_require__(0);
          __webpack_require__(0);
          module.exports = __webpack_require__(2);

          /***/
        },
        /* 2 */
        /***/function (module, exports) {

          throw new Error('Module build failed: SyntaxError: /Users/changyan/Documents/repos/zion/.babelrc: Error while parsing JSON - Unexpected EOF at line 1 column 2 of the JSON5 data. Still to read: ""\n    at error (/Users/changyan/Documents/repos/zion/node_modules/json5/lib/json5.js:56:25)\n    at word (/Users/changyan/Documents/repos/zion/node_modules/json5/lib/json5.js:393:13)\n    at value (/Users/changyan/Documents/repos/zion/node_modules/json5/lib/json5.js:493:56)\n    at Object.parse (/Users/changyan/Documents/repos/zion/node_modules/json5/lib/json5.js:508:18)\n    at ConfigChainBuilder.addConfig (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:150:65)\n    at ConfigChainBuilder.findConfigs (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:96:16)\n    at buildConfigChain (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/options/build-config-chain.js:61:13)\n    at OptionManager.init (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/options/option-manager.js:354:58)\n    at File.initOptions (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/index.js:212:65)\n    at new File (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/file/index.js:135:24)\n    at Pipeline.transform (/Users/changyan/Documents/repos/zion/node_modules/babel-core/lib/transformation/pipeline.js:46:16)\n    at transpile (/Users/changyan/Documents/repos/zion/node_modules/babel-loader/lib/index.js:50:20)\n    at Object.module.exports (/Users/changyan/Documents/repos/zion/node_modules/babel-loader/lib/index.js:175:20)');

          /***/
        }]
        /******/);

        /***/
      }]
      /******/);

      /***/
    }]
    /******/);

    /***/
  }]
  /******/);

  /***/
}]
/******/);

/***/ })
/******/ ]);