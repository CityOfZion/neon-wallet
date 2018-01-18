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
/******/ 	__webpack_require__.p = "/neon-website/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(20);
} else {
  module.exports = require('./cjs/react.development.js');
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var asap = __webpack_require__(15);

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._75 = 0;
  this._83 = 0;
  this._18 = null;
  this._38 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._47 = null;
Promise._71 = null;
Promise._44 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._83 === 3) {
    self = self._18;
  }
  if (Promise._47) {
    Promise._47(self);
  }
  if (self._83 === 0) {
    if (self._75 === 0) {
      self._75 = 1;
      self._38 = deferred;
      return;
    }
    if (self._75 === 1) {
      self._75 = 2;
      self._38 = [self._38, deferred];
      return;
    }
    self._38.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._83 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._83 === 1) {
        resolve(deferred.promise, self._18);
      } else {
        reject(deferred.promise, self._18);
      }
      return;
    }
    var ret = tryCallOne(cb, self._18);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._83 = 3;
      self._18 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._83 = 1;
  self._18 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._83 = 2;
  self._18 = newValue;
  if (Promise._71) {
    Promise._71(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._75 === 1) {
    handle(self, self._38);
    self._38 = null;
  }
  if (self._75 === 2) {
    for (var i = 0; i < self._38.length; i++) {
      handle(self, self._38[i]);
    }
    self._38 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (false) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(21);
} else {
  module.exports = require('./cjs/react-dom.development.js');
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(48)();
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTabbableDescendants;
/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

var tabbableNode = /input|select|textarea|button|object/;

function hidden(el) {
  return el.offsetWidth <= 0 && el.offsetHeight <= 0 || el.style.display === "none";
}

function visible(element) {
  var parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) break;
    if (hidden(parentElement)) return false;
    parentElement = parentElement.parentNode;
  }
  return true;
}

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

function tabbable(element) {
  var tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll("*"), 0).filter(tabbable);
}
module.exports = exports["default"];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertNodeList = assertNodeList;
exports.setElement = setElement;
exports.tryForceFallback = tryForceFallback;
exports.validateElement = validateElement;
exports.hide = hide;
exports.show = show;
exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
exports.resetForTesting = resetForTesting;
var globalElement = null;

function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error("react-modal: No elements were found for selector " + selector + ".");
  }
}

function setElement(element) {
  var useElement = element;
  if (typeof useElement === "string") {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = "length" in el ? el[0] : el;
  }
  globalElement = useElement || globalElement;
  return globalElement;
}

function tryForceFallback() {
  if (document && document.body) {
    // force fallback to document.body
    setElement(document.body);
    return true;
  }
  return false;
}

function validateElement(appElement) {
  if (!appElement && !globalElement && !tryForceFallback()) {
    throw new Error(["react-modal: Cannot fallback to `document.body`, because it is not", "ready or available. If you are doing server-side rendering, use this", "function to defined an element. `Modal.setAppElement(el)` to make", "this accessible"].join(" "));
  }
}

function hide(appElement) {
  validateElement(appElement);
  (appElement || globalElement).setAttribute("aria-hidden", "true");
}

function show(appElement) {
  validateElement(appElement);
  (appElement || globalElement).removeAttribute("aria-hidden");
}

function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

function resetForTesting() {
  globalElement = document.body;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.add = add;
exports.remove = remove;
exports.totalCount = totalCount;
var classListMap = {};

function get() {
  return classListMap;
}

function add(bodyClass) {
  // Set variable and default if none
  if (!classListMap[bodyClass]) {
    classListMap[bodyClass] = 0;
  }
  classListMap[bodyClass] += 1;
  return bodyClass;
}

function remove(bodyClass) {
  if (classListMap[bodyClass]) {
    classListMap[bodyClass] -= 1;
  }
  return bodyClass;
}

function totalCount() {
  return Object.keys(classListMap).reduce(function (acc, curr) {
    return acc + classListMap[curr];
  }, 0);
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canUseDOM = undefined;

var _exenv = __webpack_require__(54);

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EE = _exenv2.default;

var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};

var canUseDOM = exports.canUseDOM = EE.canUseDOM;

exports.default = SafeHTMLElement;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
module.exports = __webpack_require__(19);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  __webpack_require__(14).enable();
  window.Promise = __webpack_require__(17);
}

// fetch() polyfill for making API calls.
__webpack_require__(18);

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = __webpack_require__(2);

// In tests, polyfill requestAnimationFrame since jsdom doesn't provide it yet.
// We don't polyfill it in the browser--this is user's responsibility.
if (false) {
  require('raf').polyfill(global);
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(4);

var DEFAULT_WHITELIST = [
  ReferenceError,
  TypeError,
  RangeError
];

var enabled = false;
exports.disable = disable;
function disable() {
  enabled = false;
  Promise._47 = null;
  Promise._71 = null;
}

exports.enable = enable;
function enable(options) {
  options = options || {};
  if (enabled) disable();
  enabled = true;
  var id = 0;
  var displayId = 0;
  var rejections = {};
  Promise._47 = function (promise) {
    if (
      promise._83 === 2 && // IS REJECTED
      rejections[promise._56]
    ) {
      if (rejections[promise._56].logged) {
        onHandled(promise._56);
      } else {
        clearTimeout(rejections[promise._56].timeout);
      }
      delete rejections[promise._56];
    }
  };
  Promise._71 = function (promise, err) {
    if (promise._75 === 0) { // not yet handled
      promise._56 = id++;
      rejections[promise._56] = {
        displayId: null,
        error: err,
        timeout: setTimeout(
          onUnhandled.bind(null, promise._56),
          // For reference errors and type errors, this almost always
          // means the programmer made a mistake, so log them after just
          // 100ms
          // otherwise, wait 2 seconds to see if they get handled
          matchWhitelist(err, DEFAULT_WHITELIST)
            ? 100
            : 2000
        ),
        logged: false
      };
    }
  };
  function onUnhandled(id) {
    if (
      options.allRejections ||
      matchWhitelist(
        rejections[id].error,
        options.whitelist || DEFAULT_WHITELIST
      )
    ) {
      rejections[id].displayId = displayId++;
      if (options.onUnhandled) {
        rejections[id].logged = true;
        options.onUnhandled(
          rejections[id].displayId,
          rejections[id].error
        );
      } else {
        rejections[id].logged = true;
        logError(
          rejections[id].displayId,
          rejections[id].error
        );
      }
    }
  }
  function onHandled(id) {
    if (rejections[id].logged) {
      if (options.onHandled) {
        options.onHandled(rejections[id].displayId, rejections[id].error);
      } else if (!rejections[id].onUnhandled) {
        console.warn(
          'Promise Rejection Handled (id: ' + rejections[id].displayId + '):'
        );
        console.warn(
          '  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id ' +
          rejections[id].displayId + '.'
        );
      }
    }
  }
}

function logError(id, error) {
  console.warn('Possible Unhandled Promise Rejection (id: ' + id + '):');
  var errStr = (error && (error.stack || error)) + '';
  errStr.split('\n').forEach(function (line) {
    console.warn('  ' + line);
  });
}

function matchWhitelist(error, list) {
  return list.some(function (cls) {
    return error instanceof cls;
  });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = __webpack_require__(4);

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._44);
  p._83 = 1;
  p._18 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._83 === 3) {
            val = val._18;
          }
          if (val._83 === 1) return res(i, val._18);
          if (val._83 === 2) reject(val._18);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__registerServiceWorker__ = __webpack_require__(58);






__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__App__["a" /* default */], null), document.getElementById('root'));
Object(__WEBPACK_IMPORTED_MODULE_4__registerServiceWorker__["a" /* default */])();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/
var f=__webpack_require__(2),p=__webpack_require__(5);__webpack_require__(3);var r=__webpack_require__(1);
function t(a){for(var b=arguments.length-1,d="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,e=0;e<b;e++)d+="\x26args[]\x3d"+encodeURIComponent(arguments[e+1]);b=Error(d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var u={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function v(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}v.prototype.isReactComponent={};v.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?t("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};v.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function w(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}function x(){}x.prototype=v.prototype;var y=w.prototype=new x;y.constructor=w;f(y,v.prototype);y.isPureReactComponent=!0;function z(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}var A=z.prototype=new x;A.constructor=z;f(A,v.prototype);A.unstable_isAsyncReactComponent=!0;A.render=function(){return this.props.children};
var B={Component:v,PureComponent:w,AsyncComponent:z},C={current:null},D=Object.prototype.hasOwnProperty,E="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,F={key:!0,ref:!0,__self:!0,__source:!0};function G(a,b,d,e,c,g,k){return{$$typeof:E,type:a,key:b,ref:d,props:k,_owner:g}}
G.createElement=function(a,b,d){var e,c={},g=null,k=null,m=null,q=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),m=void 0===b.__self?null:b.__self,q=void 0===b.__source?null:b.__source,b)D.call(b,e)&&!F.hasOwnProperty(e)&&(c[e]=b[e]);var l=arguments.length-2;if(1===l)c.children=d;else if(1<l){for(var h=Array(l),n=0;n<l;n++)h[n]=arguments[n+2];c.children=h}if(a&&a.defaultProps)for(e in l=a.defaultProps,l)void 0===c[e]&&(c[e]=l[e]);return G(a,g,k,m,q,C.current,c)};
G.createFactory=function(a){var b=G.createElement.bind(null,a);b.type=a;return b};G.cloneAndReplaceKey=function(a,b){return G(a.type,b,a.ref,a._self,a._source,a._owner,a.props)};
G.cloneElement=function(a,b,d){var e=f({},a.props),c=a.key,g=a.ref,k=a._self,m=a._source,q=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,q=C.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(h in b)D.call(b,h)&&!F.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==l?l[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=d;else if(1<h){l=Array(h);for(var n=0;n<h;n++)l[n]=arguments[n+2];e.children=l}return G(a.type,c,g,k,m,q,e)};
G.isValidElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===E};var H="function"===typeof Symbol&&Symbol.iterator,I="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var J=/\/+/g,K=[];
function L(a,b,d,e){if(K.length){var c=K.pop();c.result=a;c.keyPrefix=b;c.func=d;c.context=e;c.count=0;return c}return{result:a,keyPrefix:b,func:d,context:e,count:0}}function M(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>K.length&&K.push(a)}
function N(a,b,d,e){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;if(null===a||"string"===c||"number"===c||"object"===c&&a.$$typeof===I)return d(e,a,""===b?"."+O(a,0):b),1;var g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){c=a[k];var m=b+O(c,k);g+=N(c,m,d,e)}else if(m=H&&a[H]||a["@@iterator"],"function"===typeof m)for(a=m.call(a),k=0;!(c=a.next()).done;)c=c.value,m=b+O(c,k++),g+=N(c,m,d,e);else"object"===c&&(d=""+a,t("31","[object Object]"===d?"object with keys {"+
Object.keys(a).join(", ")+"}":d,""));return g}function O(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function P(a,b){a.func.call(a.context,b,a.count++)}function Q(a,b,d){var e=a.result,c=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?R(a,e,d,r.thatReturnsArgument):null!=a&&(G.isValidElement(a)&&(a=G.cloneAndReplaceKey(a,c+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(J,"$\x26/")+"/")+d)),e.push(a))}
function R(a,b,d,e,c){var g="";null!=d&&(g=(""+d).replace(J,"$\x26/")+"/");b=L(b,g,e,c);null==a||N(a,"",Q,b);M(b)}var S={forEach:function(a,b,d){if(null==a)return a;b=L(null,null,b,d);null==a||N(a,"",P,b);M(b)},map:function(a,b,d){if(null==a)return a;var e=[];R(a,e,null,b,d);return e},count:function(a){return null==a?0:N(a,"",r.thatReturnsNull,null)},toArray:function(a){var b=[];R(a,b,null,r.thatReturnsArgument);return b}};
module.exports={Children:{map:S.map,forEach:S.forEach,count:S.count,toArray:S.toArray,only:function(a){G.isValidElement(a)?void 0:t("143");return a}},Component:B.Component,PureComponent:B.PureComponent,unstable_AsyncComponent:B.AsyncComponent,createElement:G.createElement,cloneElement:G.cloneElement,isValidElement:G.isValidElement,createFactory:G.createFactory,version:"16.0.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:C,assign:f}};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react-dom.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(0);__webpack_require__(3);var l=__webpack_require__(22),n=__webpack_require__(2),ba=__webpack_require__(23),ca=__webpack_require__(1),da=__webpack_require__(5),ea=__webpack_require__(24),fa=__webpack_require__(25),ha=__webpack_require__(28),ia=__webpack_require__(29);
function w(a){for(var b=arguments.length-1,c="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,d=0;d<b;d++)c+="\x26args[]\x3d"+encodeURIComponent(arguments[d+1]);b=Error(c+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}aa?void 0:w("227");
function ja(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
var ka={Namespaces:{html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"},getIntrinsicNamespace:ja,getChildNamespace:function(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?ja(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}},la=null,oa={};
function pa(){if(la)for(var a in oa){var b=oa[a],c=la.indexOf(a);-1<c?void 0:w("96",a);if(!qa.plugins[c]){b.extractEvents?void 0:w("97",a);qa.plugins[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;qa.eventNameDispatchConfigs.hasOwnProperty(h)?w("99",h):void 0;qa.eventNameDispatchConfigs[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&ra(k[e],g,h);e=!0}else f.registrationName?(ra(f.registrationName,g,h),e=!0):e=!1;e?void 0:w("98",d,a)}}}}
function ra(a,b,c){qa.registrationNameModules[a]?w("100",a):void 0;qa.registrationNameModules[a]=b;qa.registrationNameDependencies[a]=b.eventTypes[c].dependencies}
var qa={plugins:[],eventNameDispatchConfigs:{},registrationNameModules:{},registrationNameDependencies:{},possibleRegistrationNames:null,injectEventPluginOrder:function(a){la?w("101"):void 0;la=Array.prototype.slice.call(a);pa()},injectEventPluginsByName:function(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];oa.hasOwnProperty(c)&&oa[c]===d||(oa[c]?w("102",c):void 0,oa[c]=d,b=!0)}b&&pa()}},sa=qa,ta={children:!0,dangerouslySetInnerHTML:!0,autoFocus:!0,defaultValue:!0,defaultChecked:!0,
innerHTML:!0,suppressContentEditableWarning:!0,style:!0};function ua(a,b){return(a&b)===b}
var wa={MUST_USE_PROPERTY:1,HAS_BOOLEAN_VALUE:4,HAS_NUMERIC_VALUE:8,HAS_POSITIVE_NUMERIC_VALUE:24,HAS_OVERLOADED_BOOLEAN_VALUE:32,HAS_STRING_BOOLEAN_VALUE:64,injectDOMPropertyConfig:function(a){var b=wa,c=a.Properties||{},d=a.DOMAttributeNamespaces||{},e=a.DOMAttributeNames||{};a=a.DOMMutationMethods||{};for(var f in c){xa.properties.hasOwnProperty(f)?w("48",f):void 0;var g=f.toLowerCase(),h=c[f];g={attributeName:g,attributeNamespace:null,propertyName:f,mutationMethod:null,mustUseProperty:ua(h,b.MUST_USE_PROPERTY),
hasBooleanValue:ua(h,b.HAS_BOOLEAN_VALUE),hasNumericValue:ua(h,b.HAS_NUMERIC_VALUE),hasPositiveNumericValue:ua(h,b.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:ua(h,b.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:ua(h,b.HAS_STRING_BOOLEAN_VALUE)};1>=g.hasBooleanValue+g.hasNumericValue+g.hasOverloadedBooleanValue?void 0:w("50",f);e.hasOwnProperty(f)&&(g.attributeName=e[f]);d.hasOwnProperty(f)&&(g.attributeNamespace=d[f]);a.hasOwnProperty(f)&&(g.mutationMethod=a[f]);xa.properties[f]=
g}}},xa={ID_ATTRIBUTE_NAME:"data-reactid",ROOT_ATTRIBUTE_NAME:"data-reactroot",ATTRIBUTE_NAME_START_CHAR:":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",ATTRIBUTE_NAME_CHAR:":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",
properties:{},shouldSetAttribute:function(a,b){if(xa.isReservedProp(a)||!("o"!==a[0]&&"O"!==a[0]||"n"!==a[1]&&"N"!==a[1]))return!1;if(null===b)return!0;switch(typeof b){case "boolean":return xa.shouldAttributeAcceptBooleanValue(a);case "undefined":case "number":case "string":case "object":return!0;default:return!1}},getPropertyInfo:function(a){return xa.properties.hasOwnProperty(a)?xa.properties[a]:null},shouldAttributeAcceptBooleanValue:function(a){if(xa.isReservedProp(a))return!0;var b=xa.getPropertyInfo(a);
if(b)return b.hasBooleanValue||b.hasStringBooleanValue||b.hasOverloadedBooleanValue;a=a.toLowerCase().slice(0,5);return"data-"===a||"aria-"===a},isReservedProp:function(a){return ta.hasOwnProperty(a)},injection:wa},A=xa,E={IndeterminateComponent:0,FunctionalComponent:1,ClassComponent:2,HostRoot:3,HostPortal:4,HostComponent:5,HostText:6,CoroutineComponent:7,CoroutineHandlerPhase:8,YieldComponent:9,Fragment:10},F={ELEMENT_NODE:1,TEXT_NODE:3,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_FRAGMENT_NODE:11},
ya=E.HostComponent,za=E.HostText,Aa=F.ELEMENT_NODE,Ba=F.COMMENT_NODE,Ea=A.ID_ATTRIBUTE_NAME,Fa={hasCachedChildNodes:1},Ga=Math.random().toString(36).slice(2),Ha="__reactInternalInstance$"+Ga,Ia="__reactEventHandlers$"+Ga;function La(a){for(var b;b=a._renderedComponent;)a=b;return a}function Ma(a,b){a=La(a);a._hostNode=b;b[Ha]=a}
function Na(a,b){if(!(a._flags&Fa.hasCachedChildNodes)){var c=a._renderedChildren;b=b.firstChild;var d;a:for(d in c)if(c.hasOwnProperty(d)){var e=c[d],f=La(e)._domID;if(0!==f){for(;null!==b;b=b.nextSibling){var g=b,h=f;if(g.nodeType===Aa&&g.getAttribute(Ea)===""+h||g.nodeType===Ba&&g.nodeValue===" react-text: "+h+" "||g.nodeType===Ba&&g.nodeValue===" react-empty: "+h+" "){Ma(e,b);continue a}}w("32",f)}}a._flags|=Fa.hasCachedChildNodes}}
function Oa(a){if(a[Ha])return a[Ha];for(var b=[];!a[Ha];)if(b.push(a),a.parentNode)a=a.parentNode;else return null;var c=a[Ha];if(c.tag===ya||c.tag===za)return c;for(;a&&(c=a[Ha]);a=b.pop()){var d=c;b.length&&Na(c,a)}return d}
var G={getClosestInstanceFromNode:Oa,getInstanceFromNode:function(a){var b=a[Ha];if(b)return b.tag===ya||b.tag===za?b:b._hostNode===a?b:null;b=Oa(a);return null!=b&&b._hostNode===a?b:null},getNodeFromInstance:function(a){if(a.tag===ya||a.tag===za)return a.stateNode;void 0===a._hostNode?w("33"):void 0;if(a._hostNode)return a._hostNode;for(var b=[];!a._hostNode;)b.push(a),a._hostParent?void 0:w("34"),a=a._hostParent;for(;b.length;a=b.pop())Na(a,a._hostNode);return a._hostNode},precacheChildNodes:Na,
precacheNode:Ma,uncacheNode:function(a){var b=a._hostNode;b&&(delete b[Ha],a._hostNode=null)},precacheFiberNode:function(a,b){b[Ha]=a},getFiberCurrentPropsFromNode:function(a){return a[Ia]||null},updateFiberProps:function(a,b){a[Ia]=b}},Pa={remove:function(a){a._reactInternalFiber=void 0},get:function(a){return a._reactInternalFiber},has:function(a){return void 0!==a._reactInternalFiber},set:function(a,b){a._reactInternalFiber=b}},Qa={ReactCurrentOwner:aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner};
function Ra(a){if("function"===typeof a.getName)return a.getName();if("number"===typeof a.tag){a=a.type;if("string"===typeof a)return a;if("function"===typeof a)return a.displayName||a.name}return null}var J={NoEffect:0,PerformedWork:1,Placement:2,Update:4,PlacementAndUpdate:6,Deletion:8,ContentReset:16,Callback:32,Err:64,Ref:128},Sa=E.HostComponent,Ta=E.HostRoot,Ua=E.HostPortal,Va=E.HostText,Wa=J.NoEffect,Xa=J.Placement;
function Za(a){var b=a;if(a.alternate)for(;b["return"];)b=b["return"];else{if((b.effectTag&Xa)!==Wa)return 1;for(;b["return"];)if(b=b["return"],(b.effectTag&Xa)!==Wa)return 1}return b.tag===Ta?2:3}function $a(a){2!==Za(a)?w("188"):void 0}
function ab(a){var b=a.alternate;if(!b)return b=Za(a),3===b?w("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c["return"],f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return $a(e),a;if(g===d)return $a(e),b;g=g.sibling}w("188")}if(c["return"]!==d["return"])c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}g?
void 0:w("189")}}c.alternate!==d?w("190"):void 0}c.tag!==Ta?w("188"):void 0;return c.stateNode.current===c?a:b}
var bb={isFiberMounted:function(a){return 2===Za(a)},isMounted:function(a){return(a=Pa.get(a))?2===Za(a):!1},findCurrentFiberUsingSlowPath:ab,findCurrentHostFiber:function(a){a=ab(a);if(!a)return null;for(var b=a;;){if(b.tag===Sa||b.tag===Va)return b;if(b.child)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null},findCurrentHostFiberWithNoPortals:function(a){a=ab(a);
if(!a)return null;for(var b=a;;){if(b.tag===Sa||b.tag===Va)return b;if(b.child&&b.tag!==Ua)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b["return"]||b["return"]===a)return null;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}return null}},K={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,injection:{injectErrorUtils:function(a){"function"!==typeof a.invokeGuardedCallback?w("197"):void 0;cb=a.invokeGuardedCallback}},invokeGuardedCallback:function(a,
b,c,d,e,f,g,h,k){cb.apply(K,arguments)},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){K.invokeGuardedCallback.apply(this,arguments);if(K.hasCaughtError()){var p=K.clearCaughtError();K._hasRethrowError||(K._hasRethrowError=!0,K._rethrowError=p)}},rethrowCaughtError:function(){return db.apply(K,arguments)},hasCaughtError:function(){return K._hasCaughtError},clearCaughtError:function(){if(K._hasCaughtError){var a=K._caughtError;K._caughtError=null;K._hasCaughtError=!1;return a}w("198")}};
function cb(a,b,c,d,e,f,g,h,k){K._hasCaughtError=!1;K._caughtError=null;var p=Array.prototype.slice.call(arguments,3);try{b.apply(c,p)}catch(x){K._caughtError=x,K._hasCaughtError=!0}}function db(){if(K._hasRethrowError){var a=K._rethrowError;K._rethrowError=null;K._hasRethrowError=!1;throw a;}}var eb=K,fb;function gb(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=hb.getNodeFromInstance(d);eb.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null}
var hb={isEndish:function(a){return"topMouseUp"===a||"topTouchEnd"===a||"topTouchCancel"===a},isMoveish:function(a){return"topMouseMove"===a||"topTouchMove"===a},isStartish:function(a){return"topMouseDown"===a||"topTouchStart"===a},executeDirectDispatch:function(a){var b=a._dispatchListeners,c=a._dispatchInstances;Array.isArray(b)?w("103"):void 0;a.currentTarget=b?hb.getNodeFromInstance(c):null;b=b?b(a):null;a.currentTarget=null;a._dispatchListeners=null;a._dispatchInstances=null;return b},executeDispatchesInOrder:function(a,
b){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)gb(a,b,c[e],d[e]);else c&&gb(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null},executeDispatchesInOrderStopAtTrue:function(a){a:{var b=a._dispatchListeners;var c=a._dispatchInstances;if(Array.isArray(b))for(var d=0;d<b.length&&!a.isPropagationStopped();d++){if(b[d](a,c[d])){b=c[d];break a}}else if(b&&b(a,c)){b=c;break a}b=null}a._dispatchInstances=null;a._dispatchListeners=
null;return b},hasDispatches:function(a){return!!a._dispatchListeners},getFiberCurrentPropsFromNode:function(a){return fb.getFiberCurrentPropsFromNode(a)},getInstanceFromNode:function(a){return fb.getInstanceFromNode(a)},getNodeFromInstance:function(a){return fb.getNodeFromInstance(a)},injection:{injectComponentTree:function(a){fb=a}}},ib=hb,jb=null,kb=null,lb=null;
function mb(a){if(a=ib.getInstanceFromNode(a))if("number"===typeof a.tag){jb&&"function"===typeof jb.restoreControlledState?void 0:w("194");var b=ib.getFiberCurrentPropsFromNode(a.stateNode);jb.restoreControlledState(a.stateNode,a.type,b)}else"function"!==typeof a.restoreControlledState?w("195"):void 0,a.restoreControlledState()}
var nb={injection:{injectFiberControlledHostComponent:function(a){jb=a}},enqueueStateRestore:function(a){kb?lb?lb.push(a):lb=[a]:kb=a},restoreStateIfNeeded:function(){if(kb){var a=kb,b=lb;lb=kb=null;mb(a);if(b)for(a=0;a<b.length;a++)mb(b[a])}}};function ob(a,b,c,d,e,f){return a(b,c,d,e,f)}function pb(a,b){return a(b)}function qb(a,b){return pb(a,b)}
var rb=!1,sb={batchedUpdates:function(a,b){if(rb)return ob(qb,a,b);rb=!0;try{return ob(qb,a,b)}finally{rb=!1,nb.restoreStateIfNeeded()}},injection:{injectStackBatchedUpdates:function(a){ob=a},injectFiberBatchedUpdates:function(a){pb=a}}},tb=F.TEXT_NODE;function ub(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return a.nodeType===tb?a.parentNode:a}var vb=E.HostRoot,wb=[];
function xb(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c=b;if("number"===typeof c.tag){for(;c["return"];)c=c["return"];c=c.tag!==vb?null:c.stateNode.containerInfo}else{for(;c._hostParent;)c=c._hostParent;c=G.getNodeFromInstance(c).parentNode}if(!c)break;a.ancestors.push(b);b=G.getClosestInstanceFromNode(c)}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],yb._handleTopLevel(a.topLevelType,b,a.nativeEvent,ub(a.nativeEvent))}
var yb={_enabled:!0,_handleTopLevel:null,setHandleTopLevel:function(a){yb._handleTopLevel=a},setEnabled:function(a){yb._enabled=!!a},isEnabled:function(){return yb._enabled},trapBubbledEvent:function(a,b,c){return c?ba.listen(c,b,yb.dispatchEvent.bind(null,a)):null},trapCapturedEvent:function(a,b,c){return c?ba.capture(c,b,yb.dispatchEvent.bind(null,a)):null},dispatchEvent:function(a,b){if(yb._enabled){var c=ub(b);c=G.getClosestInstanceFromNode(c);null===c||"number"!==typeof c.tag||bb.isFiberMounted(c)||
(c=null);if(wb.length){var d=wb.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{sb.batchedUpdates(xb,a)}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>wb.length&&wb.push(a)}}}},L=yb;function Cb(a,b){null==b?w("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}
function Db(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var Eb=null;function Fb(a,b){a&&(ib.executeDispatchesInOrder(a,b),a.isPersistent()||a.constructor.release(a))}function Gb(a){return Fb(a,!0)}function Hb(a){return Fb(a,!1)}
function Ib(a,b,c){switch(a){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":return!(!c.disabled||"button"!==b&&"input"!==b&&"select"!==b&&"textarea"!==b);default:return!1}}
var Jb={injection:{injectEventPluginOrder:sa.injectEventPluginOrder,injectEventPluginsByName:sa.injectEventPluginsByName},getListener:function(a,b){if("number"===typeof a.tag){var c=a.stateNode;if(!c)return null;var d=ib.getFiberCurrentPropsFromNode(c);if(!d)return null;c=d[b];if(Ib(b,a.type,d))return null}else{d=a._currentElement;if("string"===typeof d||"number"===typeof d||!a._rootNodeID)return null;a=d.props;c=a[b];if(Ib(b,d.type,a))return null}c&&"function"!==typeof c?w("231",b,typeof c):void 0;
return c},extractEvents:function(a,b,c,d){for(var e,f=sa.plugins,g=0;g<f.length;g++){var h=f[g];h&&(h=h.extractEvents(a,b,c,d))&&(e=Cb(e,h))}return e},enqueueEvents:function(a){a&&(Eb=Cb(Eb,a))},processEventQueue:function(a){var b=Eb;Eb=null;a?Db(b,Gb):Db(b,Hb);Eb?w("95"):void 0;eb.rethrowCaughtError()}},Kb;l.canUseDOM&&(Kb=document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("",""));
function Lb(a,b){if(!l.canUseDOM||b&&!("addEventListener"in document))return!1;b="on"+a;var c=b in document;c||(c=document.createElement("div"),c.setAttribute(b,"return;"),c="function"===typeof c[b]);!c&&Kb&&"wheel"===a&&(c=document.implementation.hasFeature("Events.wheel","3.0"));return c}function Mb(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
var Nb={animationend:Mb("Animation","AnimationEnd"),animationiteration:Mb("Animation","AnimationIteration"),animationstart:Mb("Animation","AnimationStart"),transitionend:Mb("Transition","TransitionEnd")},Ob={},Pb={};l.canUseDOM&&(Pb=document.createElement("div").style,"AnimationEvent"in window||(delete Nb.animationend.animation,delete Nb.animationiteration.animation,delete Nb.animationstart.animation),"TransitionEvent"in window||delete Nb.transitionend.transition);
function Qb(a){if(Ob[a])return Ob[a];if(!Nb[a])return a;var b=Nb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Pb)return Ob[a]=b[c];return""}
var Rb={topAbort:"abort",topAnimationEnd:Qb("animationend")||"animationend",topAnimationIteration:Qb("animationiteration")||"animationiteration",topAnimationStart:Qb("animationstart")||"animationstart",topBlur:"blur",topCancel:"cancel",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topChange:"change",topClick:"click",topClose:"close",topCompositionEnd:"compositionend",topCompositionStart:"compositionstart",topCompositionUpdate:"compositionupdate",topContextMenu:"contextmenu",topCopy:"copy",
topCut:"cut",topDoubleClick:"dblclick",topDrag:"drag",topDragEnd:"dragend",topDragEnter:"dragenter",topDragExit:"dragexit",topDragLeave:"dragleave",topDragOver:"dragover",topDragStart:"dragstart",topDrop:"drop",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topFocus:"focus",topInput:"input",topKeyDown:"keydown",topKeyPress:"keypress",topKeyUp:"keyup",topLoadedData:"loadeddata",topLoad:"load",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",
topMouseDown:"mousedown",topMouseMove:"mousemove",topMouseOut:"mouseout",topMouseOver:"mouseover",topMouseUp:"mouseup",topPaste:"paste",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topScroll:"scroll",topSeeked:"seeked",topSeeking:"seeking",topSelectionChange:"selectionchange",topStalled:"stalled",topSuspend:"suspend",topTextInput:"textInput",topTimeUpdate:"timeupdate",topToggle:"toggle",topTouchCancel:"touchcancel",topTouchEnd:"touchend",topTouchMove:"touchmove",
topTouchStart:"touchstart",topTransitionEnd:Qb("transitionend")||"transitionend",topVolumeChange:"volumechange",topWaiting:"waiting",topWheel:"wheel"},Sb={},Tb=0,Ub="_reactListenersID"+(""+Math.random()).slice(2);function Vb(a){Object.prototype.hasOwnProperty.call(a,Ub)||(a[Ub]=Tb++,Sb[a[Ub]]={});return Sb[a[Ub]]}
var M=n({},{handleTopLevel:function(a,b,c,d){a=Jb.extractEvents(a,b,c,d);Jb.enqueueEvents(a);Jb.processEventQueue(!1)}},{setEnabled:function(a){L&&L.setEnabled(a)},isEnabled:function(){return!(!L||!L.isEnabled())},listenTo:function(a,b){var c=Vb(b);a=sa.registrationNameDependencies[a];for(var d=0;d<a.length;d++){var e=a[d];c.hasOwnProperty(e)&&c[e]||("topWheel"===e?Lb("wheel")?L.trapBubbledEvent("topWheel","wheel",b):Lb("mousewheel")?L.trapBubbledEvent("topWheel","mousewheel",b):L.trapBubbledEvent("topWheel",
"DOMMouseScroll",b):"topScroll"===e?L.trapCapturedEvent("topScroll","scroll",b):"topFocus"===e||"topBlur"===e?(L.trapCapturedEvent("topFocus","focus",b),L.trapCapturedEvent("topBlur","blur",b),c.topBlur=!0,c.topFocus=!0):"topCancel"===e?(Lb("cancel",!0)&&L.trapCapturedEvent("topCancel","cancel",b),c.topCancel=!0):"topClose"===e?(Lb("close",!0)&&L.trapCapturedEvent("topClose","close",b),c.topClose=!0):Rb.hasOwnProperty(e)&&L.trapBubbledEvent(e,Rb[e],b),c[e]=!0)}},isListeningToAllDependencies:function(a,
b){b=Vb(b);a=sa.registrationNameDependencies[a];for(var c=0;c<a.length;c++){var d=a[c];if(!b.hasOwnProperty(d)||!b[d])return!1}return!0},trapBubbledEvent:function(a,b,c){return L.trapBubbledEvent(a,b,c)},trapCapturedEvent:function(a,b,c){return L.trapCapturedEvent(a,b,c)}}),Wb={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,
flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Xb=["Webkit","ms","Moz","O"];
Object.keys(Wb).forEach(function(a){Xb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Wb[b]=Wb[a]})});
var Yb={isUnitlessNumber:Wb,shorthandPropertyExpansions:{background:{backgroundAttachment:!0,backgroundColor:!0,backgroundImage:!0,backgroundPositionX:!0,backgroundPositionY:!0,backgroundRepeat:!0},backgroundPosition:{backgroundPositionX:!0,backgroundPositionY:!0},border:{borderWidth:!0,borderStyle:!0,borderColor:!0},borderBottom:{borderBottomWidth:!0,borderBottomStyle:!0,borderBottomColor:!0},borderLeft:{borderLeftWidth:!0,borderLeftStyle:!0,borderLeftColor:!0},borderRight:{borderRightWidth:!0,borderRightStyle:!0,
borderRightColor:!0},borderTop:{borderTopWidth:!0,borderTopStyle:!0,borderTopColor:!0},font:{fontStyle:!0,fontVariant:!0,fontWeight:!0,fontSize:!0,lineHeight:!0,fontFamily:!0},outline:{outlineWidth:!0,outlineStyle:!0,outlineColor:!0}}},Zb=Yb.isUnitlessNumber,$b=!1;if(l.canUseDOM){var ac=document.createElement("div").style;try{ac.font=""}catch(a){$b=!0}}
var bc={createDangerousStringForStyles:function(){},setValueForStyles:function(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Zb.hasOwnProperty(e)&&Zb[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");if(d)a.setProperty(c,e);else if(e)a[c]=e;else if(d=$b&&Yb.shorthandPropertyExpansions[c])for(var g in d)a[g]="";else a[c]=""}}},cc=new RegExp("^["+A.ATTRIBUTE_NAME_START_CHAR+
"]["+A.ATTRIBUTE_NAME_CHAR+"]*$"),dc={},ec={};function fc(a){if(ec.hasOwnProperty(a))return!0;if(dc.hasOwnProperty(a))return!1;if(cc.test(a))return ec[a]=!0;dc[a]=!0;return!1}
var gc={setAttributeForID:function(a,b){a.setAttribute(A.ID_ATTRIBUTE_NAME,b)},setAttributeForRoot:function(a){a.setAttribute(A.ROOT_ATTRIBUTE_NAME,"")},getValueForProperty:function(){},getValueForAttribute:function(){},setValueForProperty:function(a,b,c){var d=A.getPropertyInfo(b);if(d&&A.shouldSetAttribute(b,c)){var e=d.mutationMethod;e?e(a,c):null==c||d.hasBooleanValue&&!c||d.hasNumericValue&&isNaN(c)||d.hasPositiveNumericValue&&1>c||d.hasOverloadedBooleanValue&&!1===c?gc.deleteValueForProperty(a,
b):d.mustUseProperty?a[d.propertyName]=c:(b=d.attributeName,(e=d.attributeNamespace)?a.setAttributeNS(e,b,""+c):d.hasBooleanValue||d.hasOverloadedBooleanValue&&!0===c?a.setAttribute(b,""):a.setAttribute(b,""+c))}else gc.setValueForAttribute(a,b,A.shouldSetAttribute(b,c)?c:null)},setValueForAttribute:function(a,b,c){fc(b)&&(null==c?a.removeAttribute(b):a.setAttribute(b,""+c))},deleteValueForAttribute:function(a,b){a.removeAttribute(b)},deleteValueForProperty:function(a,b){var c=A.getPropertyInfo(b);
c?(b=c.mutationMethod)?b(a,void 0):c.mustUseProperty?a[c.propertyName]=c.hasBooleanValue?!1:"":a.removeAttribute(c.attributeName):a.removeAttribute(b)}},hc=gc,ic=Qa.ReactDebugCurrentFrame;function jc(){return null}
var kc={current:null,phase:null,resetCurrentFiber:function(){ic.getCurrentStack=null;kc.current=null;kc.phase=null},setCurrentFiber:function(a,b){ic.getCurrentStack=jc;kc.current=a;kc.phase=b},getCurrentFiberOwnerName:function(){return null},getCurrentFiberStackAddendum:jc},lc=kc,mc={getHostProps:function(a,b){var c=b.value,d=b.checked;return n({type:void 0,step:void 0,min:void 0,max:void 0},b,{defaultChecked:void 0,defaultValue:void 0,value:null!=c?c:a._wrapperState.initialValue,checked:null!=d?
d:a._wrapperState.initialChecked})},initWrapperState:function(a,b){var c=b.defaultValue;a._wrapperState={initialChecked:null!=b.checked?b.checked:b.defaultChecked,initialValue:null!=b.value?b.value:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}},updateWrapper:function(a,b){var c=b.checked;null!=c&&hc.setValueForProperty(a,"checked",c||!1);c=b.value;if(null!=c)if(0===c&&""===a.value)a.value="0";else if("number"===b.type){if(b=parseFloat(a.value)||0,c!=b||c==b&&a.value!=
c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else null==b.value&&null!=b.defaultValue&&a.defaultValue!==""+b.defaultValue&&(a.defaultValue=""+b.defaultValue),null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)},postMountWrapper:function(a,b){switch(b.type){case "submit":case "reset":break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":a.value="";a.value=a.defaultValue;break;default:a.value=a.value}b=a.name;""!==
b&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==b&&(a.name=b)},restoreControlledState:function(a,b){mc.updateWrapper(a,b);var c=b.name;if("radio"===b.type&&null!=c){for(b=a;b.parentNode;)b=b.parentNode;c=b.querySelectorAll("input[name\x3d"+JSON.stringify(""+c)+'][type\x3d"radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=G.getFiberCurrentPropsFromNode(d);e?void 0:w("90");mc.updateWrapper(d,e)}}}}},qc=mc;
function rc(a){var b="";aa.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a)});return b}var sc={validateProps:function(){},postMountWrapper:function(a,b){null!=b.value&&a.setAttribute("value",b.value)},getHostProps:function(a,b){a=n({children:void 0},b);if(b=rc(b.children))a.children=b;return a}};
function tc(a,b,c){a=a.options;if(b){b={};for(var d=0;d<c.length;d++)b["$"+c[d]]=!0;for(c=0;c<a.length;c++)d=b.hasOwnProperty("$"+a[c].value),a[c].selected!==d&&(a[c].selected=d)}else{c=""+c;b=null;for(d=0;d<a.length;d++){if(a[d].value===c){a[d].selected=!0;return}null!==b||a[d].disabled||(b=a[d])}null!==b&&(b.selected=!0)}}
var uc={getHostProps:function(a,b){return n({},b,{value:void 0})},initWrapperState:function(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple}},postMountWrapper:function(a,b){a.multiple=!!b.multiple;var c=b.value;null!=c?tc(a,!!b.multiple,c):null!=b.defaultValue&&tc(a,!!b.multiple,b.defaultValue)},postUpdateWrapper:function(a,b){a._wrapperState.initialValue=void 0;var c=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!b.multiple;var d=b.value;
null!=d?tc(a,!!b.multiple,d):c!==!!b.multiple&&(null!=b.defaultValue?tc(a,!!b.multiple,b.defaultValue):tc(a,!!b.multiple,b.multiple?[]:""))},restoreControlledState:function(a,b){var c=b.value;null!=c&&tc(a,!!b.multiple,c)}},vc={getHostProps:function(a,b){null!=b.dangerouslySetInnerHTML?w("91"):void 0;return n({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})},initWrapperState:function(a,b){var c=b.value,d=c;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?
w("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:w("93"),b=b[0]),c=""+b),null==c&&(c=""),d=c);a._wrapperState={initialValue:""+d}},updateWrapper:function(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue)},postMountWrapper:function(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b)},restoreControlledState:function(a,b){vc.updateWrapper(a,b)}},wc=vc,xc=n({menuitem:!0},{area:!0,
base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function yc(a,b){b&&(xc[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?w("137",a,""):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?w("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:w("61")),null!=b.style&&"object"!==typeof b.style?w("62",""):void 0)}
function zc(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ac(a){var b=zc(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"function"===typeof c.get&&"function"===typeof c.set)return Object.defineProperty(a,b,{enumerable:c.enumerable,configurable:!0,get:function(){return c.get.call(this)},set:function(a){d=""+a;c.set.call(this,a)}}),{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=null;delete a[b]}}}
var Bc={_getTrackerFromNode:function(a){return a._valueTracker},track:function(a){a._valueTracker||(a._valueTracker=Ac(a))},updateValueIfChanged:function(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=zc(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1},stopTracking:function(a){(a=a._valueTracker)&&a.stopTracking()}};
function Cc(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}
var Dc=ka.Namespaces,Ec,Fc=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Dc.svg||"innerHTML"in a)a.innerHTML=b;else for(Ec=Ec||document.createElement("div"),Ec.innerHTML="\x3csvg\x3e"+b+"\x3c/svg\x3e",b=Ec.firstChild;b.firstChild;)a.appendChild(b.firstChild)}),Gc=/["'&<>]/,Hc=F.TEXT_NODE;
function Ic(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&c.nodeType===Hc){c.nodeValue=b;return}}a.textContent=b}
l.canUseDOM&&("textContent"in document.documentElement||(Ic=function(a,b){if(a.nodeType===Hc)a.nodeValue=b;else{if("boolean"===typeof b||"number"===typeof b)b=""+b;else{b=""+b;var c=Gc.exec(b);if(c){var d="",e,f=0;for(e=c.index;e<b.length;e++){switch(b.charCodeAt(e)){case 34:c="\x26quot;";break;case 38:c="\x26amp;";break;case 39:c="\x26#x27;";break;case 60:c="\x26lt;";break;case 62:c="\x26gt;";break;default:continue}f!==e&&(d+=b.substring(f,e));f=e+1;d+=c}b=f!==e?d+b.substring(f,e):d}}Fc(a,b)}}));
var Jc=Ic,Kc=lc.getCurrentFiberOwnerName,Lc=F.DOCUMENT_NODE,Mc=F.DOCUMENT_FRAGMENT_NODE,Nc=M.listenTo,Oc=sa.registrationNameModules,Pc=ka.Namespaces.html,Qc=ka.getIntrinsicNamespace;function Rc(a,b){Nc(b,a.nodeType===Lc||a.nodeType===Mc?a:a.ownerDocument)}
var Sc={topAbort:"abort",topCanPlay:"canplay",topCanPlayThrough:"canplaythrough",topDurationChange:"durationchange",topEmptied:"emptied",topEncrypted:"encrypted",topEnded:"ended",topError:"error",topLoadedData:"loadeddata",topLoadedMetadata:"loadedmetadata",topLoadStart:"loadstart",topPause:"pause",topPlay:"play",topPlaying:"playing",topProgress:"progress",topRateChange:"ratechange",topSeeked:"seeked",topSeeking:"seeking",topStalled:"stalled",topSuspend:"suspend",topTimeUpdate:"timeupdate",topVolumeChange:"volumechange",
topWaiting:"waiting"},N={createElement:function(a,b,c,d){c=c.nodeType===Lc?c:c.ownerDocument;d===Pc&&(d=Qc(a));d===Pc?"script"===a?(a=c.createElement("div"),a.innerHTML="\x3cscript\x3e\x3c/script\x3e",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a},createTextNode:function(a,b){return(b.nodeType===Lc?b:b.ownerDocument).createTextNode(a)},setInitialProperties:function(a,b,c,d){var e=Cc(b,c);switch(b){case "iframe":case "object":M.trapBubbledEvent("topLoad",
"load",a);var f=c;break;case "video":case "audio":for(f in Sc)Sc.hasOwnProperty(f)&&M.trapBubbledEvent(f,Sc[f],a);f=c;break;case "source":M.trapBubbledEvent("topError","error",a);f=c;break;case "img":case "image":M.trapBubbledEvent("topError","error",a);M.trapBubbledEvent("topLoad","load",a);f=c;break;case "form":M.trapBubbledEvent("topReset","reset",a);M.trapBubbledEvent("topSubmit","submit",a);f=c;break;case "details":M.trapBubbledEvent("topToggle","toggle",a);f=c;break;case "input":qc.initWrapperState(a,
c);f=qc.getHostProps(a,c);M.trapBubbledEvent("topInvalid","invalid",a);Rc(d,"onChange");break;case "option":sc.validateProps(a,c);f=sc.getHostProps(a,c);break;case "select":uc.initWrapperState(a,c);f=uc.getHostProps(a,c);M.trapBubbledEvent("topInvalid","invalid",a);Rc(d,"onChange");break;case "textarea":wc.initWrapperState(a,c);f=wc.getHostProps(a,c);M.trapBubbledEvent("topInvalid","invalid",a);Rc(d,"onChange");break;default:f=c}yc(b,f,Kc);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===
h?bc.setValueForStyles(a,k):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&Fc(a,k)):"children"===h?"string"===typeof k?Jc(a,k):"number"===typeof k&&Jc(a,""+k):"suppressContentEditableWarning"!==h&&(Oc.hasOwnProperty(h)?null!=k&&Rc(d,h):e?hc.setValueForAttribute(a,h,k):null!=k&&hc.setValueForProperty(a,h,k))}switch(b){case "input":Bc.track(a);qc.postMountWrapper(a,c);break;case "textarea":Bc.track(a);wc.postMountWrapper(a,c);break;case "option":sc.postMountWrapper(a,c);break;case "select":uc.postMountWrapper(a,
c);break;default:"function"===typeof f.onClick&&(a.onclick=ca)}},diffProperties:function(a,b,c,d,e){var f=null;switch(b){case "input":c=qc.getHostProps(a,c);d=qc.getHostProps(a,d);f=[];break;case "option":c=sc.getHostProps(a,c);d=sc.getHostProps(a,d);f=[];break;case "select":c=uc.getHostProps(a,c);d=uc.getHostProps(a,d);f=[];break;case "textarea":c=wc.getHostProps(a,c);d=wc.getHostProps(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=ca)}yc(b,d,Kc);
var g,h;a=null;for(g in c)if(!d.hasOwnProperty(g)&&c.hasOwnProperty(g)&&null!=c[g])if("style"===g)for(h in b=c[g],b)b.hasOwnProperty(h)&&(a||(a={}),a[h]="");else"dangerouslySetInnerHTML"!==g&&"children"!==g&&"suppressContentEditableWarning"!==g&&(Oc.hasOwnProperty(g)?f||(f=[]):(f=f||[]).push(g,null));for(g in d){var k=d[g];b=null!=c?c[g]:void 0;if(d.hasOwnProperty(g)&&k!==b&&(null!=k||null!=b))if("style"===g)if(b){for(h in b)!b.hasOwnProperty(h)||k&&k.hasOwnProperty(h)||(a||(a={}),a[h]="");for(h in k)k.hasOwnProperty(h)&&
b[h]!==k[h]&&(a||(a={}),a[h]=k[h])}else a||(f||(f=[]),f.push(g,a)),a=k;else"dangerouslySetInnerHTML"===g?(k=k?k.__html:void 0,b=b?b.__html:void 0,null!=k&&b!==k&&(f=f||[]).push(g,""+k)):"children"===g?b===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(g,""+k):"suppressContentEditableWarning"!==g&&(Oc.hasOwnProperty(g)?(null!=k&&Rc(e,g),f||b===k||(f=[])):(f=f||[]).push(g,k))}a&&(f=f||[]).push("style",a);return f},updateProperties:function(a,b,c,d,e){Cc(c,d);d=Cc(c,e);for(var f=0;f<b.length;f+=
2){var g=b[f],h=b[f+1];"style"===g?bc.setValueForStyles(a,h):"dangerouslySetInnerHTML"===g?Fc(a,h):"children"===g?Jc(a,h):d?null!=h?hc.setValueForAttribute(a,g,h):hc.deleteValueForAttribute(a,g):null!=h?hc.setValueForProperty(a,g,h):hc.deleteValueForProperty(a,g)}switch(c){case "input":qc.updateWrapper(a,e);Bc.updateValueIfChanged(a);break;case "textarea":wc.updateWrapper(a,e);break;case "select":uc.postUpdateWrapper(a,e)}},diffHydratedProperties:function(a,b,c,d,e){switch(b){case "iframe":case "object":M.trapBubbledEvent("topLoad",
"load",a);break;case "video":case "audio":for(var f in Sc)Sc.hasOwnProperty(f)&&M.trapBubbledEvent(f,Sc[f],a);break;case "source":M.trapBubbledEvent("topError","error",a);break;case "img":case "image":M.trapBubbledEvent("topError","error",a);M.trapBubbledEvent("topLoad","load",a);break;case "form":M.trapBubbledEvent("topReset","reset",a);M.trapBubbledEvent("topSubmit","submit",a);break;case "details":M.trapBubbledEvent("topToggle","toggle",a);break;case "input":qc.initWrapperState(a,c);M.trapBubbledEvent("topInvalid",
"invalid",a);Rc(e,"onChange");break;case "option":sc.validateProps(a,c);break;case "select":uc.initWrapperState(a,c);M.trapBubbledEvent("topInvalid","invalid",a);Rc(e,"onChange");break;case "textarea":wc.initWrapperState(a,c),M.trapBubbledEvent("topInvalid","invalid",a),Rc(e,"onChange")}yc(b,c,Kc);d=null;for(var g in c)c.hasOwnProperty(g)&&(f=c[g],"children"===g?"string"===typeof f?a.textContent!==f&&(d=["children",f]):"number"===typeof f&&a.textContent!==""+f&&(d=["children",""+f]):Oc.hasOwnProperty(g)&&
null!=f&&Rc(e,g));switch(b){case "input":Bc.track(a);qc.postMountWrapper(a,c);break;case "textarea":Bc.track(a);wc.postMountWrapper(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&(a.onclick=ca)}return d},diffHydratedText:function(a,b){return a.nodeValue!==b},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,
b,c){switch(b){case "input":qc.restoreControlledState(a,c);break;case "textarea":wc.restoreControlledState(a,c);break;case "select":uc.restoreControlledState(a,c)}}},Tc=void 0;
if(l.canUseDOM)if("function"!==typeof requestIdleCallback){var Uc=null,Vc=null,Wc=!1,Xc=!1,Yc=0,Zc=33,$c=33,ad={timeRemaining:"object"===typeof performance&&"function"===typeof performance.now?function(){return Yc-performance.now()}:function(){return Yc-Date.now()}},bd="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){a.source===window&&a.data===bd&&(Wc=!1,a=Vc,Vc=null,null!==a&&a(ad))},!1);var cd=function(a){Xc=!1;var b=a-Yc+$c;b<$c&&Zc<$c?(8>
b&&(b=8),$c=b<Zc?Zc:b):Zc=b;Yc=a+$c;Wc||(Wc=!0,window.postMessage(bd,"*"));b=Uc;Uc=null;null!==b&&b(a)};Tc=function(a){Vc=a;Xc||(Xc=!0,requestAnimationFrame(cd));return 0}}else Tc=requestIdleCallback;else Tc=function(a){setTimeout(function(){a({timeRemaining:function(){return Infinity}})});return 0};
var dd={rIC:Tc},ed={enableAsyncSubtreeAPI:!0},Q={NoWork:0,SynchronousPriority:1,TaskPriority:2,HighPriority:3,LowPriority:4,OffscreenPriority:5},fd=J.Callback,gd=Q.NoWork,hd=Q.SynchronousPriority,id=Q.TaskPriority,jd=E.ClassComponent,kd=E.HostRoot,md=void 0,nd=void 0;function od(a,b){return a!==id&&a!==hd||b!==id&&b!==hd?a===gd&&b!==gd?-255:a!==gd&&b===gd?255:a-b:0}function pd(){return{first:null,last:null,hasForceUpdate:!1,callbackList:null}}
function qd(a,b,c,d){null!==c?c.next=b:(b.next=a.first,a.first=b);null!==d?b.next=d:a.last=b}function rd(a,b){b=b.priorityLevel;var c=null;if(null!==a.last&&0>=od(a.last.priorityLevel,b))c=a.last;else for(a=a.first;null!==a&&0>=od(a.priorityLevel,b);)c=a,a=a.next;return c}
function sd(a,b){var c=a.alternate,d=a.updateQueue;null===d&&(d=a.updateQueue=pd());null!==c?(a=c.updateQueue,null===a&&(a=c.updateQueue=pd())):a=null;md=d;nd=a!==d?a:null;var e=md;c=nd;var f=rd(e,b),g=null!==f?f.next:e.first;if(null===c)return qd(e,b,f,g),null;d=rd(c,b);a=null!==d?d.next:c.first;qd(e,b,f,g);if(g===a&&null!==g||f===d&&null!==f)return null===d&&(c.first=b),null===a&&(c.last=null),null;b={priorityLevel:b.priorityLevel,partialState:b.partialState,callback:b.callback,isReplace:b.isReplace,
isForced:b.isForced,isTopLevelUnmount:b.isTopLevelUnmount,next:null};qd(c,b,d,a);return b}function td(a,b,c,d){a=a.partialState;return"function"===typeof a?a.call(b,c,d):a}
var ud={addUpdate:function(a,b,c,d){sd(a,{priorityLevel:d,partialState:b,callback:c,isReplace:!1,isForced:!1,isTopLevelUnmount:!1,next:null})},addReplaceUpdate:function(a,b,c,d){sd(a,{priorityLevel:d,partialState:b,callback:c,isReplace:!0,isForced:!1,isTopLevelUnmount:!1,next:null})},addForceUpdate:function(a,b,c){sd(a,{priorityLevel:c,partialState:null,callback:b,isReplace:!1,isForced:!0,isTopLevelUnmount:!1,next:null})},getUpdatePriority:function(a){var b=a.updateQueue;return null===b||a.tag!==
jd&&a.tag!==kd?gd:null!==b.first?b.first.priorityLevel:gd},addTopLevelUpdate:function(a,b,c,d){var e=null===b.element;b={priorityLevel:d,partialState:b,callback:c,isReplace:!1,isForced:!1,isTopLevelUnmount:e,next:null};a=sd(a,b);e&&(e=md,c=nd,null!==e&&null!==b.next&&(b.next=null,e.last=b),null!==c&&null!==a&&null!==a.next&&(a.next=null,c.last=b))},beginUpdateQueue:function(a,b,c,d,e,f,g){null!==a&&a.updateQueue===c&&(c=b.updateQueue={first:c.first,last:c.last,callbackList:null,hasForceUpdate:!1});
a=c.callbackList;for(var h=c.hasForceUpdate,k=!0,p=c.first;null!==p&&0>=od(p.priorityLevel,g);){c.first=p.next;null===c.first&&(c.last=null);var x;if(p.isReplace)e=td(p,d,e,f),k=!0;else if(x=td(p,d,e,f))e=k?n({},e,x):n(e,x),k=!1;p.isForced&&(h=!0);null===p.callback||p.isTopLevelUnmount&&null!==p.next||(a=null!==a?a:[],a.push(p.callback),b.effectTag|=fd);p=p.next}c.callbackList=a;c.hasForceUpdate=h;null!==c.first||null!==a||h||(b.updateQueue=null);return e},commitCallbacks:function(a,b,c){a=b.callbackList;
if(null!==a)for(b.callbackList=null,b=0;b<a.length;b++){var d=a[b];"function"!==typeof d?w("191",d):void 0;d.call(c)}}},vd=[],wd=-1,xd={createCursor:function(a){return{current:a}},isEmpty:function(){return-1===wd},pop:function(a){0>wd||(a.current=vd[wd],vd[wd]=null,wd--)},push:function(a,b){wd++;vd[wd]=a.current;a.current=b},reset:function(){for(;-1<wd;)vd[wd]=null,wd--}},yd=bb.isFiberMounted,zd=E.ClassComponent,Ad=E.HostRoot,Bd=xd.createCursor,Cd=xd.pop,Dd=xd.push,Ed=Bd(da),Fd=Bd(!1),Ld=da;
function Md(a,b,c){a=a.stateNode;a.__reactInternalMemoizedUnmaskedChildContext=b;a.__reactInternalMemoizedMaskedChildContext=c}function Nd(a){return a.tag===zd&&null!=a.type.childContextTypes}function Od(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:w("108",Ra(a)||"Unknown",e);return n({},b,c)}
var R={getUnmaskedContext:function(a){return Nd(a)?Ld:Ed.current},cacheContext:Md,getMaskedContext:function(a,b){var c=a.type.contextTypes;if(!c)return da;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&Md(a,b,e);return e},hasContextChanged:function(){return Fd.current},isContextConsumer:function(a){return a.tag===zd&&null!=a.type.contextTypes},isContextProvider:Nd,popContextProvider:function(a){Nd(a)&&
(Cd(Fd,a),Cd(Ed,a))},popTopLevelContextObject:function(a){Cd(Fd,a);Cd(Ed,a)},pushTopLevelContextObject:function(a,b,c){null!=Ed.cursor?w("168"):void 0;Dd(Ed,b,a);Dd(Fd,c,a)},processChildContext:Od,pushContextProvider:function(a){if(!Nd(a))return!1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||da;Ld=Ed.current;Dd(Ed,b,a);Dd(Fd,Fd.current,a);return!0},invalidateContextProvider:function(a,b){var c=a.stateNode;c?void 0:w("169");if(b){var d=Od(a,Ld,!0);c.__reactInternalMemoizedMergedChildContext=
d;Cd(Fd,a);Cd(Ed,a);Dd(Ed,d,a)}else Cd(Fd,a);Dd(Fd,b,a)},resetContext:function(){Ld=da;Ed.current=da;Fd.current=!1},findCurrentUnmaskedContext:function(a){for(yd(a)&&a.tag===zd?void 0:w("170");a.tag!==Ad;){if(Nd(a))return a.stateNode.__reactInternalMemoizedMergedChildContext;(a=a["return"])?void 0:w("171")}return a.stateNode.context}},Pd={NoContext:0,AsyncUpdates:1},Qd=E.IndeterminateComponent,Rd=E.ClassComponent,Sd=E.HostRoot,Td=E.HostComponent,Ud=E.HostText,Vd=E.HostPortal,Wd=E.CoroutineComponent,
Xd=E.YieldComponent,Yd=E.Fragment,Zd=Q.NoWork,$d=Pd.NoContext,ae=J.NoEffect;function be(a,b,c){this.tag=a;this.key=b;this.stateNode=this.type=null;this.sibling=this.child=this["return"]=null;this.index=0;this.memoizedState=this.updateQueue=this.memoizedProps=this.pendingProps=this.ref=null;this.internalContextTag=c;this.effectTag=ae;this.lastEffect=this.firstEffect=this.nextEffect=null;this.pendingWorkPriority=Zd;this.alternate=null}
function ce(a,b,c){var d=void 0;"function"===typeof a?(d=a.prototype&&a.prototype.isReactComponent?new be(Rd,b,c):new be(Qd,b,c),d.type=a):"string"===typeof a?(d=new be(Td,b,c),d.type=a):"object"===typeof a&&null!==a&&"number"===typeof a.tag?d=a:w("130",null==a?a:typeof a,"");return d}
var de={createWorkInProgress:function(a,b){var c=a.alternate;null===c?(c=new be(a.tag,a.key,a.internalContextTag),c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.effectTag=ae,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.pendingWorkPriority=b;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c},createHostRootFiber:function(){return new be(Sd,null,$d)},
createFiberFromElement:function(a,b,c){b=ce(a.type,a.key,b,null);b.pendingProps=a.props;b.pendingWorkPriority=c;return b},createFiberFromFragment:function(a,b,c){b=new be(Yd,null,b);b.pendingProps=a;b.pendingWorkPriority=c;return b},createFiberFromText:function(a,b,c){b=new be(Ud,null,b);b.pendingProps=a;b.pendingWorkPriority=c;return b},createFiberFromElementType:ce,createFiberFromHostInstanceForDeletion:function(){var a=new be(Td,null,$d);a.type="DELETED";return a},createFiberFromCoroutine:function(a,
b,c){b=new be(Wd,a.key,b);b.type=a.handler;b.pendingProps=a;b.pendingWorkPriority=c;return b},createFiberFromYield:function(a,b){return new be(Xd,null,b)},createFiberFromPortal:function(a,b,c){b=new be(Vd,a.key,b);b.pendingProps=a.children||[];b.pendingWorkPriority=c;b.stateNode={containerInfo:a.containerInfo,implementation:a.implementation};return b},largerPriority:function(a,b){return a!==Zd&&(b===Zd||b>a)?a:b}},ee=de.createHostRootFiber,fe=E.IndeterminateComponent,ge=E.FunctionalComponent,he=E.ClassComponent,
ie=E.HostComponent,je,ke;"function"===typeof Symbol&&Symbol["for"]?(je=Symbol["for"]("react.coroutine"),ke=Symbol["for"]("react.yield")):(je=60104,ke=60105);
var le={createCoroutine:function(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:je,key:null==d?null:""+d,children:a,handler:b,props:c}},createYield:function(a){return{$$typeof:ke,value:a}},isCoroutine:function(a){return"object"===typeof a&&null!==a&&a.$$typeof===je},isYield:function(a){return"object"===typeof a&&null!==a&&a.$$typeof===ke},REACT_YIELD_TYPE:ke,REACT_COROUTINE_TYPE:je},me="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.portal")||
60106,ne={createPortal:function(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:me,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}},isPortal:function(a){return"object"===typeof a&&null!==a&&a.$$typeof===me},REACT_PORTAL_TYPE:me},oe=le.REACT_COROUTINE_TYPE,pe=le.REACT_YIELD_TYPE,qe=ne.REACT_PORTAL_TYPE,re=de.createWorkInProgress,se=de.createFiberFromElement,te=de.createFiberFromFragment,ue=de.createFiberFromText,ve=de.createFiberFromCoroutine,
we=de.createFiberFromYield,xe=de.createFiberFromPortal,ye=Array.isArray,ze=E.FunctionalComponent,Ae=E.ClassComponent,Be=E.HostText,Ce=E.HostPortal,De=E.CoroutineComponent,Ee=E.YieldComponent,Fe=E.Fragment,Ge=J.NoEffect,He=J.Placement,Ie=J.Deletion,Je="function"===typeof Symbol&&Symbol.iterator,Ke="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;
function Le(a){if(null===a||"undefined"===typeof a)return null;a=Je&&a[Je]||a["@@iterator"];return"function"===typeof a?a:null}
function Me(a,b){var c=b.ref;if(null!==c&&"function"!==typeof c){if(b._owner){b=b._owner;var d=void 0;b&&("number"===typeof b.tag?(b.tag!==Ae?w("110"):void 0,d=b.stateNode):d=b.getPublicInstance());d?void 0:w("147",c);var e=""+c;if(null!==a&&null!==a.ref&&a.ref._stringRef===e)return a.ref;a=function(a){var b=d.refs===da?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a};a._stringRef=e;return a}"string"!==typeof c?w("148"):void 0;b._owner?void 0:w("149",c)}return c}
function Ne(a,b){"textarea"!==a.type&&w("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"")}
function Oe(a,b){function c(c,d){if(b){if(!a){if(null===d.alternate)return;d=d.alternate}var m=c.lastEffect;null!==m?(m.nextEffect=d,c.lastEffect=d):c.firstEffect=c.lastEffect=d;d.nextEffect=null;d.effectTag=Ie}}function d(a,d){if(!b)return null;for(;null!==d;)c(a,d),d=d.sibling;return null}function e(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function f(b,c){if(a)return b=re(b,c),b.index=0,b.sibling=null,b;b.pendingWorkPriority=c;b.effectTag=Ge;
b.index=0;b.sibling=null;return b}function g(a,c,d){a.index=d;if(!b)return c;d=a.alternate;if(null!==d)return d=d.index,d<c?(a.effectTag=He,c):d;a.effectTag=He;return c}function h(a){b&&null===a.alternate&&(a.effectTag=He);return a}function k(a,b,c,d){if(null===b||b.tag!==Be)return c=ue(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function p(a,b,c,d){if(null===b||b.type!==c.type)return d=se(c,a.internalContextTag,d),d.ref=Me(b,c),d["return"]=a,d;d=f(b,
d);d.ref=Me(b,c);d.pendingProps=c.props;d["return"]=a;return d}function x(a,b,c,d){if(null===b||b.tag!==De)return c=ve(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function S(a,b,c,d){if(null===b||b.tag!==Ee)return b=we(c,a.internalContextTag,d),b.type=c.value,b["return"]=a,b;b=f(b,d);b.type=c.value;b["return"]=a;return b}function D(a,b,c,d){if(null===b||b.tag!==Ce||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return c=
xe(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c.children||[];b["return"]=a;return b}function y(a,b,c,d){if(null===b||b.tag!==Fe)return c=te(c,a.internalContextTag,d),c["return"]=a,c;b=f(b,d);b.pendingProps=c;b["return"]=a;return b}function B(a,b,c){if("string"===typeof b||"number"===typeof b)return b=ue(""+b,a.internalContextTag,c),b["return"]=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Ke:return c=se(b,a.internalContextTag,c),c.ref=Me(null,b),c["return"]=
a,c;case oe:return b=ve(b,a.internalContextTag,c),b["return"]=a,b;case pe:return c=we(b,a.internalContextTag,c),c.type=b.value,c["return"]=a,c;case qe:return b=xe(b,a.internalContextTag,c),b["return"]=a,b}if(ye(b)||Le(b))return b=te(b,a.internalContextTag,c),b["return"]=a,b;Ne(a,b)}return null}function H(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:k(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Ke:return c.key===e?p(a,
b,c,d):null;case oe:return c.key===e?x(a,b,c,d):null;case pe:return null===e?S(a,b,c,d):null;case qe:return c.key===e?D(a,b,c,d):null}if(ye(c)||Le(c))return null!==e?null:y(a,b,c,d);Ne(a,c)}return null}function C(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,k(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Ke:return a=a.get(null===d.key?c:d.key)||null,p(b,a,d,e);case oe:return a=a.get(null===d.key?c:d.key)||null,x(b,a,d,e);case pe:return a=a.get(c)||
null,S(b,a,d,e);case qe:return a=a.get(null===d.key?c:d.key)||null,D(b,a,d,e)}if(ye(d)||Le(d))return a=a.get(c)||null,y(b,a,d,e);Ne(b,d)}return null}function Ca(a,f,h,k){for(var m=null,t=null,q=f,r=f=0,p=null;null!==q&&r<h.length;r++){q.index>r?(p=q,q=null):p=q.sibling;var v=H(a,q,h[r],k);if(null===v){null===q&&(q=p);break}b&&q&&null===v.alternate&&c(a,q);f=g(v,f,r);null===t?m=v:t.sibling=v;t=v;q=p}if(r===h.length)return d(a,q),m;if(null===q){for(;r<h.length;r++)if(q=B(a,h[r],k))f=g(q,f,r),null===
t?m=q:t.sibling=q,t=q;return m}for(q=e(a,q);r<h.length;r++)if(p=C(q,a,r,h[r],k)){if(b&&null!==p.alternate)q["delete"](null===p.key?r:p.key);f=g(p,f,r);null===t?m=p:t.sibling=p;t=p}b&&q.forEach(function(b){return c(a,b)});return m}function r(a,f,h,r){var m=Le(h);"function"!==typeof m?w("150"):void 0;h=m.call(h);null==h?w("151"):void 0;for(var t=m=null,q=f,k=f=0,p=null,v=h.next();null!==q&&!v.done;k++,v=h.next()){q.index>k?(p=q,q=null):p=q.sibling;var V=H(a,q,v.value,r);if(null===V){q||(q=p);break}b&&
q&&null===V.alternate&&c(a,q);f=g(V,f,k);null===t?m=V:t.sibling=V;t=V;q=p}if(v.done)return d(a,q),m;if(null===q){for(;!v.done;k++,v=h.next())v=B(a,v.value,r),null!==v&&(f=g(v,f,k),null===t?m=v:t.sibling=v,t=v);return m}for(q=e(a,q);!v.done;k++,v=h.next())if(v=C(q,a,k,v.value,r),null!==v){if(b&&null!==v.alternate)q["delete"](null===v.key?k:v.key);f=g(v,f,k);null===t?m=v:t.sibling=v;t=v}b&&q.forEach(function(b){return c(a,b)});return m}return function(a,b,e,g){var m="object"===typeof e&&null!==e;if(m)switch(e.$$typeof){case Ke:a:{var C=
e.key;for(m=b;null!==m;){if(m.key===C)if(m.type===e.type){d(a,m.sibling);b=f(m,g);b.ref=Me(m,e);b.pendingProps=e.props;b["return"]=a;a=b;break a}else{d(a,m);break}else c(a,m);m=m.sibling}g=se(e,a.internalContextTag,g);g.ref=Me(b,e);g["return"]=a;a=g}return h(a);case oe:a:{for(m=e.key;null!==b;){if(b.key===m)if(b.tag===De){d(a,b.sibling);b=f(b,g);b.pendingProps=e;b["return"]=a;a=b;break a}else{d(a,b);break}else c(a,b);b=b.sibling}e=ve(e,a.internalContextTag,g);e["return"]=a;a=e}return h(a);case pe:a:{if(null!==
b)if(b.tag===Ee){d(a,b.sibling);b=f(b,g);b.type=e.value;b["return"]=a;a=b;break a}else d(a,b);b=we(e,a.internalContextTag,g);b.type=e.value;b["return"]=a;a=b}return h(a);case qe:a:{for(m=e.key;null!==b;){if(b.key===m)if(b.tag===Ce&&b.stateNode.containerInfo===e.containerInfo&&b.stateNode.implementation===e.implementation){d(a,b.sibling);b=f(b,g);b.pendingProps=e.children||[];b["return"]=a;a=b;break a}else{d(a,b);break}else c(a,b);b=b.sibling}e=xe(e,a.internalContextTag,g);e["return"]=a;a=e}return h(a)}if("string"===
typeof e||"number"===typeof e)return e=""+e,null!==b&&b.tag===Be?(d(a,b.sibling),b=f(b,g),b.pendingProps=e,b["return"]=a,a=b):(d(a,b),e=ue(e,a.internalContextTag,g),e["return"]=a,a=e),h(a);if(ye(e))return Ca(a,b,e,g);if(Le(e))return r(a,b,e,g);m&&Ne(a,e);if("undefined"===typeof e)switch(a.tag){case Ae:case ze:e=a.type,w("152",e.displayName||e.name||"Component")}return d(a,b)}}
var Pe=Oe(!0,!0),Qe=Oe(!1,!0),Re=Oe(!1,!1),Se={reconcileChildFibers:Pe,reconcileChildFibersInPlace:Qe,mountChildFibersInPlace:Re,cloneChildFibers:function(a,b){null!==a&&b.child!==a.child?w("153"):void 0;if(null!==b.child){a=b.child;var c=re(a,a.pendingWorkPriority);c.pendingProps=a.pendingProps;b.child=c;for(c["return"]=b;null!==a.sibling;)a=a.sibling,c=c.sibling=re(a,a.pendingWorkPriority),c.pendingProps=a.pendingProps,c["return"]=b;c.sibling=null}}},Te=J.Update,Ue=Pd.AsyncUpdates,Ve=R.cacheContext,
We=R.getMaskedContext,Xe=R.getUnmaskedContext,Ye=R.isContextConsumer,Ze=ud.addUpdate,$e=ud.addReplaceUpdate,af=ud.addForceUpdate,bf=ud.beginUpdateQueue,cf=R.hasContextChanged,df=bb.isMounted;
function ef(a,b,c,d){function e(a,b){b.updater=f;a.stateNode=b;Pa.set(b,a)}var f={isMounted:df,enqueueSetState:function(c,d,e){c=Pa.get(c);var f=b(c,!1);Ze(c,d,void 0===e?null:e,f);a(c,f)},enqueueReplaceState:function(c,d,e){c=Pa.get(c);var f=b(c,!1);$e(c,d,void 0===e?null:e,f);a(c,f)},enqueueForceUpdate:function(c,d){c=Pa.get(c);var e=b(c,!1);af(c,void 0===d?null:d,e);a(c,e)}};return{adoptClassInstance:e,constructClassInstance:function(a,b){var c=a.type,d=Xe(a),f=Ye(a),g=f?We(a,d):da;b=new c(b,g);
e(a,b);f&&Ve(a,d,g);return b},mountClassInstance:function(a,b){var c=a.alternate,d=a.stateNode,e=d.state||null,g=a.pendingProps;g?void 0:w("158");var h=Xe(a);d.props=g;d.state=e;d.refs=da;d.context=We(a,h);ed.enableAsyncSubtreeAPI&&null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent&&(a.internalContextTag|=Ue);"function"===typeof d.componentWillMount&&(h=d.state,d.componentWillMount(),h!==d.state&&f.enqueueReplaceState(d,d.state,null),h=a.updateQueue,null!==
h&&(d.state=bf(c,a,h,d,e,g,b)));"function"===typeof d.componentDidMount&&(a.effectTag|=Te)},updateClassInstance:function(a,b,e){var g=b.stateNode;g.props=b.memoizedProps;g.state=b.memoizedState;var h=b.memoizedProps,k=b.pendingProps;k||(k=h,null==k?w("159"):void 0);var D=g.context,y=Xe(b);y=We(b,y);"function"!==typeof g.componentWillReceiveProps||h===k&&D===y||(D=g.state,g.componentWillReceiveProps(k,y),g.state!==D&&f.enqueueReplaceState(g,g.state,null));D=b.memoizedState;e=null!==b.updateQueue?bf(a,
b,b.updateQueue,g,D,k,e):D;if(!(h!==k||D!==e||cf()||null!==b.updateQueue&&b.updateQueue.hasForceUpdate))return"function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&D===a.memoizedState||(b.effectTag|=Te),!1;var B=k;if(null===h||null!==b.updateQueue&&b.updateQueue.hasForceUpdate)B=!0;else{var H=b.stateNode,C=b.type;B="function"===typeof H.shouldComponentUpdate?H.shouldComponentUpdate(B,e,y):C.prototype&&C.prototype.isPureReactComponent?!ea(h,B)||!ea(D,e):!0}B?("function"===typeof g.componentWillUpdate&&
g.componentWillUpdate(k,e,y),"function"===typeof g.componentDidUpdate&&(b.effectTag|=Te)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&D===a.memoizedState||(b.effectTag|=Te),c(b,k),d(b,e));g.props=k;g.state=e;g.context=y;return B}}}
var ff=Se.mountChildFibersInPlace,gf=Se.reconcileChildFibers,hf=Se.reconcileChildFibersInPlace,jf=Se.cloneChildFibers,kf=ud.beginUpdateQueue,lf=R.getMaskedContext,mf=R.getUnmaskedContext,nf=R.hasContextChanged,of=R.pushContextProvider,pf=R.pushTopLevelContextObject,qf=R.invalidateContextProvider,rf=E.IndeterminateComponent,sf=E.FunctionalComponent,tf=E.ClassComponent,uf=E.HostRoot,wf=E.HostComponent,xf=E.HostText,yf=E.HostPortal,zf=E.CoroutineComponent,Af=E.CoroutineHandlerPhase,Bf=E.YieldComponent,
Cf=E.Fragment,Df=Q.NoWork,Ef=Q.OffscreenPriority,Ff=J.PerformedWork,Gf=J.Placement,Hf=J.ContentReset,If=J.Err,Jf=J.Ref,Kf=Qa.ReactCurrentOwner;
function Lf(a,b,c,d,e){function f(a,b,c){g(a,b,c,b.pendingWorkPriority)}function g(a,b,c,d){b.child=null===a?ff(b,b.child,c,d):a.child===b.child?gf(b,b.child,c,d):hf(b,b.child,c,d)}function h(a,b){var c=b.ref;null===c||a&&a.ref===c||(b.effectTag|=Jf)}function k(a,b,c,d){h(a,b);if(!c)return d&&qf(b,!1),x(a,b);c=b.stateNode;Kf.current=b;var e=c.render();b.effectTag|=Ff;f(a,b,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&qf(b,!0);return b.child}function p(a){var b=a.stateNode;b.pendingContext?
pf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&pf(a,b.context,!1);C(a,b.containerInfo)}function x(a,b){jf(a,b);return b.child}function S(a,b){switch(b.tag){case uf:p(b);break;case tf:of(b);break;case yf:C(b,b.stateNode.containerInfo)}return null}var D=a.shouldSetTextContent,y=a.useSyncScheduling,B=a.shouldDeprioritizeSubtree,H=b.pushHostContext,C=b.pushHostContainer,Ca=c.enterHydrationState,r=c.resetHydrationState,m=c.tryToClaimNextHydratableInstance;a=ef(d,e,function(a,b){a.memoizedProps=
b},function(a,b){a.memoizedState=b});var t=a.adoptClassInstance,v=a.constructClassInstance,V=a.mountClassInstance,ld=a.updateClassInstance;return{beginWork:function(a,b,c){if(b.pendingWorkPriority===Df||b.pendingWorkPriority>c)return S(a,b);switch(b.tag){case rf:null!==a?w("155"):void 0;var d=b.type,e=b.pendingProps,g=mf(b);g=lf(b,g);d=d(e,g);b.effectTag|=Ff;"object"===typeof d&&null!==d&&"function"===typeof d.render?(b.tag=tf,e=of(b),t(b,d),V(b,c),b=k(a,b,!0,e)):(b.tag=sf,f(a,b,d),b.memoizedProps=
e,b=b.child);return b;case sf:a:{e=b.type;c=b.pendingProps;d=b.memoizedProps;if(nf())null===c&&(c=d);else if(null===c||d===c){b=x(a,b);break a}d=mf(b);d=lf(b,d);e=e(c,d);b.effectTag|=Ff;f(a,b,e);b.memoizedProps=c;b=b.child}return b;case tf:return e=of(b),d=void 0,null===a?b.stateNode?w("153"):(v(b,b.pendingProps),V(b,c),d=!0):d=ld(a,b,c),k(a,b,d,e);case uf:return p(b),d=b.updateQueue,null!==d?(e=b.memoizedState,d=kf(a,b,d,null,e,null,c),e===d?(r(),b=x(a,b)):(e=d.element,null!==a&&null!==a.child||
!Ca(b)?(r(),f(a,b,e)):(b.effectTag|=Gf,b.child=ff(b,b.child,e,c)),b.memoizedState=d,b=b.child)):(r(),b=x(a,b)),b;case wf:H(b);null===a&&m(b);e=b.type;var q=b.memoizedProps;d=b.pendingProps;null===d&&(d=q,null===d?w("154"):void 0);g=null!==a?a.memoizedProps:null;nf()||null!==d&&q!==d?(q=d.children,D(e,d)?q=null:g&&D(e,g)&&(b.effectTag|=Hf),h(a,b),c!==Ef&&!y&&B(e,d)?(b.pendingWorkPriority=Ef,b=null):(f(a,b,q),b.memoizedProps=d,b=b.child)):b=x(a,b);return b;case xf:return null===a&&m(b),a=b.pendingProps,
null===a&&(a=b.memoizedProps),b.memoizedProps=a,null;case Af:b.tag=zf;case zf:c=b.pendingProps;if(nf())null===c&&(c=a&&a.memoizedProps,null===c?w("154"):void 0);else if(null===c||b.memoizedProps===c)c=b.memoizedProps;e=c.children;d=b.pendingWorkPriority;b.stateNode=null===a?ff(b,b.stateNode,e,d):a.child===b.child?gf(b,b.stateNode,e,d):hf(b,b.stateNode,e,d);b.memoizedProps=c;return b.stateNode;case Bf:return null;case yf:a:{C(b,b.stateNode.containerInfo);c=b.pendingWorkPriority;e=b.pendingProps;if(nf())null===
e&&(e=a&&a.memoizedProps,null==e?w("154"):void 0);else if(null===e||b.memoizedProps===e){b=x(a,b);break a}null===a?b.child=hf(b,b.child,e,c):f(a,b,e);b.memoizedProps=e;b=b.child}return b;case Cf:a:{c=b.pendingProps;if(nf())null===c&&(c=b.memoizedProps);else if(null===c||b.memoizedProps===c){b=x(a,b);break a}f(a,b,c);b.memoizedProps=c;b=b.child}return b;default:w("156")}},beginFailedWork:function(a,b,c){switch(b.tag){case tf:of(b);break;case uf:p(b);break;default:w("157")}b.effectTag|=If;null===a?
b.child=null:b.child!==a.child&&(b.child=a.child);if(b.pendingWorkPriority===Df||b.pendingWorkPriority>c)return S(a,b);b.firstEffect=null;b.lastEffect=null;g(a,b,null,c);b.tag===tf&&(a=b.stateNode,b.memoizedProps=a.props,b.memoizedState=a.state);return b.child}}}
var Mf=Se.reconcileChildFibers,Nf=R.popContextProvider,Of=R.popTopLevelContextObject,Pf=E.IndeterminateComponent,Qf=E.FunctionalComponent,Rf=E.ClassComponent,Sf=E.HostRoot,Tf=E.HostComponent,Uf=E.HostText,Vf=E.HostPortal,Wf=E.CoroutineComponent,Xf=E.CoroutineHandlerPhase,Yf=E.YieldComponent,Zf=E.Fragment,ag=J.Placement,bg=J.Ref,cg=J.Update,dg=Q.OffscreenPriority;
function eg(a,b,c){var d=a.createInstance,e=a.createTextInstance,f=a.appendInitialChild,g=a.finalizeInitialChildren,h=a.prepareUpdate,k=b.getRootHostContainer,p=b.popHostContext,x=b.getHostContext,S=b.popHostContainer,D=c.prepareToHydrateHostInstance,y=c.prepareToHydrateHostTextInstance,B=c.popHydrationState;return{completeWork:function(a,b,c){var r=b.pendingProps;if(null===r)r=b.memoizedProps;else if(b.pendingWorkPriority!==dg||c===dg)b.pendingProps=null;switch(b.tag){case Qf:return null;case Rf:return Nf(b),
null;case Sf:S(b);Of(b);r=b.stateNode;r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null);if(null===a||null===a.child)B(b),b.effectTag&=~ag;return null;case Tf:p(b);c=k();var m=b.type;if(null!==a&&null!=b.stateNode){var t=a.memoizedProps,C=b.stateNode,V=x();r=h(C,m,t,r,c,V);if(b.updateQueue=r)b.effectTag|=cg;a.ref!==b.ref&&(b.effectTag|=bg)}else{if(!r)return null===b.stateNode?w("166"):void 0,null;a=x();if(B(b))D(b,c,a)&&(b.effectTag|=cg);else{a=d(m,r,c,a,b);a:for(t=b.child;null!==
t;){if(t.tag===Tf||t.tag===Uf)f(a,t.stateNode);else if(t.tag!==Vf&&null!==t.child){t=t.child;continue}if(t===b)break a;for(;null===t.sibling;){if(null===t["return"]||t["return"]===b)break a;t=t["return"]}t=t.sibling}g(a,m,r,c)&&(b.effectTag|=cg);b.stateNode=a}null!==b.ref&&(b.effectTag|=bg)}return null;case Uf:if(a&&null!=b.stateNode)a.memoizedProps!==r&&(b.effectTag|=cg);else{if("string"!==typeof r)return null===b.stateNode?w("166"):void 0,null;a=k();c=x();B(b)?y(b)&&(b.effectTag|=cg):b.stateNode=
e(r,a,c,b)}return null;case Wf:(r=b.memoizedProps)?void 0:w("165");b.tag=Xf;c=[];a:for((m=b.stateNode)&&(m["return"]=b);null!==m;){if(m.tag===Tf||m.tag===Uf||m.tag===Vf)w("164");else if(m.tag===Yf)c.push(m.type);else if(null!==m.child){m.child["return"]=m;m=m.child;continue}for(;null===m.sibling;){if(null===m["return"]||m["return"]===b)break a;m=m["return"]}m.sibling["return"]=m["return"];m=m.sibling}m=r.handler;r=m(r.props,c);b.child=Mf(b,null!==a?a.child:null,r,b.pendingWorkPriority);return b.child;
case Xf:return b.tag=Wf,null;case Yf:return null;case Zf:return null;case Vf:return b.effectTag|=cg,S(b),null;case Pf:w("167");default:w("156")}}}}var fg=null,gg=null;function hg(a){return function(b){try{return a(b)}catch(c){}}}
var ig={injectInternals:function(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!b.supportsFiber)return!0;try{var c=b.inject(a);fg=hg(function(a){return b.onCommitFiberRoot(c,a)});gg=hg(function(a){return b.onCommitFiberUnmount(c,a)})}catch(d){}return!0},onCommitRoot:function(a){"function"===typeof fg&&fg(a)},onCommitUnmount:function(a){"function"===typeof gg&&gg(a)}},jg=E.ClassComponent,kg=E.HostRoot,lg=E.HostComponent,mg=E.HostText,ng=
E.HostPortal,og=E.CoroutineComponent,pg=ud.commitCallbacks,qg=ig.onCommitUnmount,rg=J.Placement,sg=J.Update,tg=J.Callback,ug=J.ContentReset;
function vg(a,b){function c(a){var c=a.ref;if(null!==c)try{c(null)}catch(t){b(a,t)}}function d(a){return a.tag===lg||a.tag===kg||a.tag===ng}function e(a){for(var b=a;;)if(g(b),null!==b.child&&b.tag!==ng)b.child["return"]=b,b=b.child;else{if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"]}b.sibling["return"]=b["return"];b=b.sibling}}function f(a){for(var b=a,c=!1,d=void 0,f=void 0;;){if(!c){c=b["return"];a:for(;;){null===c?w("160"):void 0;switch(c.tag){case lg:d=
c.stateNode;f=!1;break a;case kg:d=c.stateNode.containerInfo;f=!0;break a;case ng:d=c.stateNode.containerInfo;f=!0;break a}c=c["return"]}c=!0}if(b.tag===lg||b.tag===mg)e(b),f?C(d,b.stateNode):H(d,b.stateNode);else if(b.tag===ng?d=b.stateNode.containerInfo:g(b),null!==b.child){b.child["return"]=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b["return"]||b["return"]===a)return;b=b["return"];b.tag===ng&&(c=!1)}b.sibling["return"]=b["return"];b=b.sibling}}function g(a){"function"===
typeof qg&&qg(a);switch(a.tag){case jg:c(a);var d=a.stateNode;if("function"===typeof d.componentWillUnmount)try{d.props=a.memoizedProps,d.state=a.memoizedState,d.componentWillUnmount()}catch(t){b(a,t)}break;case lg:c(a);break;case og:e(a.stateNode);break;case ng:f(a)}}var h=a.commitMount,k=a.commitUpdate,p=a.resetTextContent,x=a.commitTextUpdate,S=a.appendChild,D=a.appendChildToContainer,y=a.insertBefore,B=a.insertInContainerBefore,H=a.removeChild,C=a.removeChildFromContainer,Ca=a.getPublicInstance;
return{commitPlacement:function(a){a:{for(var b=a["return"];null!==b;){if(d(b)){var c=b;break a}b=b["return"]}w("160");c=void 0}var e=b=void 0;switch(c.tag){case lg:b=c.stateNode;e=!1;break;case kg:b=c.stateNode.containerInfo;e=!0;break;case ng:b=c.stateNode.containerInfo;e=!0;break;default:w("161")}c.effectTag&ug&&(p(b),c.effectTag&=~ug);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c["return"]||d(c["return"])){c=null;break a}c=c["return"]}c.sibling["return"]=c["return"];for(c=c.sibling;c.tag!==
lg&&c.tag!==mg;){if(c.effectTag&rg)continue b;if(null===c.child||c.tag===ng)continue b;else c.child["return"]=c,c=c.child}if(!(c.effectTag&rg)){c=c.stateNode;break a}}for(var f=a;;){if(f.tag===lg||f.tag===mg)c?e?B(b,f.stateNode,c):y(b,f.stateNode,c):e?D(b,f.stateNode):S(b,f.stateNode);else if(f.tag!==ng&&null!==f.child){f.child["return"]=f;f=f.child;continue}if(f===a)break;for(;null===f.sibling;){if(null===f["return"]||f["return"]===a)return;f=f["return"]}f.sibling["return"]=f["return"];f=f.sibling}},
commitDeletion:function(a){f(a);a["return"]=null;a.child=null;a.alternate&&(a.alternate.child=null,a.alternate["return"]=null)},commitWork:function(a,b){switch(b.tag){case jg:break;case lg:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&k(c,f,e,a,d,b)}break;case mg:null===b.stateNode?w("162"):void 0;c=b.memoizedProps;x(b.stateNode,null!==a?a.memoizedProps:c,c);break;case kg:break;case ng:break;default:w("163")}},
commitLifeCycles:function(a,b){switch(b.tag){case jg:var c=b.stateNode;if(b.effectTag&sg)if(null===a)c.props=b.memoizedProps,c.state=b.memoizedState,c.componentDidMount();else{var d=a.memoizedProps;a=a.memoizedState;c.props=b.memoizedProps;c.state=b.memoizedState;c.componentDidUpdate(d,a)}b.effectTag&tg&&null!==b.updateQueue&&pg(b,b.updateQueue,c);break;case kg:a=b.updateQueue;null!==a&&pg(b,a,b.child&&b.child.stateNode);break;case lg:c=b.stateNode;null===a&&b.effectTag&sg&&h(c,b.type,b.memoizedProps,
b);break;case mg:break;case ng:break;default:w("163")}},commitAttachRef:function(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case lg:b(Ca(c));break;default:b(c)}}},commitDetachRef:function(a){a=a.ref;null!==a&&a(null)}}}var wg=xd.createCursor,xg=xd.pop,yg=xd.push,zg={};
function Ag(a){function b(a){a===zg?w("174"):void 0;return a}var c=a.getChildHostContext,d=a.getRootHostContext,e=wg(zg),f=wg(zg),g=wg(zg);return{getHostContext:function(){return b(e.current)},getRootHostContainer:function(){return b(g.current)},popHostContainer:function(a){xg(e,a);xg(f,a);xg(g,a)},popHostContext:function(a){f.current===a&&(xg(e,a),xg(f,a))},pushHostContainer:function(a,b){yg(g,b,a);b=d(b);yg(f,a,a);yg(e,b,a)},pushHostContext:function(a){var d=b(g.current),h=b(e.current);d=c(h,a.type,
d);h!==d&&(yg(f,a,a),yg(e,d,a))},resetHostContainer:function(){e.current=zg;g.current=zg}}}var Bg=E.HostComponent,Cg=E.HostText,Dg=E.HostRoot,Eg=J.Deletion,Fg=J.Placement,Gg=de.createFiberFromHostInstanceForDeletion;
function Hg(a){function b(a,b){var c=Gg();c.stateNode=b;c["return"]=a;c.effectTag=Eg;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}function c(a,b){switch(a.tag){case Bg:return f(b,a.type,a.pendingProps);case Cg:return g(b,a.pendingProps);default:return!1}}function d(a){for(a=a["return"];null!==a&&a.tag!==Bg&&a.tag!==Dg;)a=a["return"];y=a}var e=a.shouldSetTextContent,f=a.canHydrateInstance,g=a.canHydrateTextInstance,h=a.getNextHydratableSibling,k=a.getFirstHydratableChild,
p=a.hydrateInstance,x=a.hydrateTextInstance,S=a.didNotHydrateInstance,D=a.didNotFindHydratableInstance;a=a.didNotFindHydratableTextInstance;if(!(f&&g&&h&&k&&p&&x&&S&&D&&a))return{enterHydrationState:function(){return!1},resetHydrationState:function(){},tryToClaimNextHydratableInstance:function(){},prepareToHydrateHostInstance:function(){w("175")},prepareToHydrateHostTextInstance:function(){w("176")},popHydrationState:function(){return!1}};var y=null,B=null,H=!1;return{enterHydrationState:function(a){B=
k(a.stateNode.containerInfo);y=a;return H=!0},resetHydrationState:function(){B=y=null;H=!1},tryToClaimNextHydratableInstance:function(a){if(H){var d=B;if(d){if(!c(a,d)){d=h(d);if(!d||!c(a,d)){a.effectTag|=Fg;H=!1;y=a;return}b(y,B)}a.stateNode=d;y=a;B=k(d)}else a.effectTag|=Fg,H=!1,y=a}},prepareToHydrateHostInstance:function(a,b,c){b=p(a.stateNode,a.type,a.memoizedProps,b,c,a);a.updateQueue=b;return null!==b?!0:!1},prepareToHydrateHostTextInstance:function(a){return x(a.stateNode,a.memoizedProps,a)},
popHydrationState:function(a){if(a!==y)return!1;if(!H)return d(a),H=!0,!1;var c=a.type;if(a.tag!==Bg||"head"!==c&&"body"!==c&&!e(c,a.memoizedProps))for(c=B;c;)b(a,c),c=h(c);d(a);B=y?h(a.stateNode):null;return!0}}}
var Ig=R.popContextProvider,Jg=xd.reset,Kg=Qa.ReactCurrentOwner,Lg=de.createWorkInProgress,Mg=de.largerPriority,Ng=ig.onCommitRoot,T=Q.NoWork,Og=Q.SynchronousPriority,U=Q.TaskPriority,Pg=Q.HighPriority,Qg=Q.LowPriority,Rg=Q.OffscreenPriority,Sg=Pd.AsyncUpdates,Tg=J.PerformedWork,Ug=J.Placement,Vg=J.Update,Wg=J.PlacementAndUpdate,Xg=J.Deletion,Yg=J.ContentReset,Zg=J.Callback,$g=J.Err,ah=J.Ref,bh=E.HostRoot,ch=E.HostComponent,dh=E.HostPortal,eh=E.ClassComponent,fh=ud.getUpdatePriority,gh=R.resetContext;
function hh(a){function b(){for(;null!==ma&&ma.current.pendingWorkPriority===T;){ma.isScheduled=!1;var a=ma.nextScheduledRoot;ma.nextScheduledRoot=null;if(ma===zb)return zb=ma=null,z=T,null;ma=a}a=ma;for(var b=null,c=T;null!==a;)a.current.pendingWorkPriority!==T&&(c===T||c>a.current.pendingWorkPriority)&&(c=a.current.pendingWorkPriority,b=a),a=a.nextScheduledRoot;null!==b?(z=c,Jg(),gh(),t(),I=Lg(b.current,c),b!==nc&&(oc=0,nc=b)):(z=T,nc=I=null)}function c(c){Hd=!0;na=null;var d=c.stateNode;d.current===
c?w("177"):void 0;z!==Og&&z!==U||oc++;Kg.current=null;if(c.effectTag>Tg)if(null!==c.lastEffect){c.lastEffect.nextEffect=c;var e=c.firstEffect}else e=c;else e=c.firstEffect;Ui();for(u=e;null!==u;){var f=!1,g=void 0;try{for(;null!==u;){var h=u.effectTag;h&Yg&&a.resetTextContent(u.stateNode);if(h&ah){var k=u.alternate;null!==k&&Ph(k)}switch(h&~(Zg|$g|Yg|ah|Tg)){case Ug:q(u);u.effectTag&=~Ug;break;case Wg:q(u);u.effectTag&=~Ug;vf(u.alternate,u);break;case Vg:vf(u.alternate,u);break;case Xg:Id=!0,Mh(u),
Id=!1}u=u.nextEffect}}catch(Jd){f=!0,g=Jd}f&&(null===u?w("178"):void 0,x(u,g),null!==u&&(u=u.nextEffect))}Vi();d.current=c;for(u=e;null!==u;){d=!1;e=void 0;try{for(;null!==u;){var Gd=u.effectTag;Gd&(Vg|Zg)&&Nh(u.alternate,u);Gd&ah&&Oh(u);if(Gd&$g)switch(f=u,g=void 0,null!==P&&(g=P.get(f),P["delete"](f),null==g&&null!==f.alternate&&(f=f.alternate,g=P.get(f),P["delete"](f))),null==g?w("184"):void 0,f.tag){case eh:f.stateNode.componentDidCatch(g.error,{componentStack:g.componentStack});break;case bh:null===
Ja&&(Ja=g.error);break;default:w("157")}var m=u.nextEffect;u.nextEffect=null;u=m}}catch(Jd){d=!0,e=Jd}d&&(null===u?w("178"):void 0,x(u,e),null!==u&&(u=u.nextEffect))}Hd=!1;"function"===typeof Ng&&Ng(c.stateNode);va&&(va.forEach(H),va=null);b()}function d(a){for(;;){var b=Lh(a.alternate,a,z),c=a["return"],d=a.sibling;var e=a;if(!(e.pendingWorkPriority!==T&&e.pendingWorkPriority>z)){for(var f=fh(e),g=e.child;null!==g;)f=Mg(f,g.pendingWorkPriority),g=g.sibling;e.pendingWorkPriority=f}if(null!==b)return b;
null!==c&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),a.effectTag>Tg&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{na=a;break}}return null}function e(a){var b=V(a.alternate,a,z);null===b&&(b=d(a));Kg.current=null;return b}function f(a){var b=ld(a.alternate,a,z);null===b&&(b=d(a));Kg.current=null;return b}
function g(a){p(Rg,a)}function h(){if(null!==P&&0<P.size&&z===U)for(;null!==I;){var a=I;I=null!==P&&(P.has(a)||null!==a.alternate&&P.has(a.alternate))?f(I):e(I);if(null===I&&(null===na?w("179"):void 0,O=U,c(na),O=z,null===P||0===P.size||z!==U))break}}function k(a,d){null!==na?(O=U,c(na),h()):null===I&&b();if(!(z===T||z>a)){O=z;a:do{if(z<=U)for(;null!==I&&!(I=e(I),null===I&&(null===na?w("179"):void 0,O=U,c(na),O=z,h(),z===T||z>a||z>U)););else if(null!==d)for(;null!==I&&!Ab;)if(1<d.timeRemaining()){if(I=
e(I),null===I)if(null===na?w("179"):void 0,1<d.timeRemaining()){if(O=U,c(na),O=z,h(),z===T||z>a||z<Pg)break}else Ab=!0}else Ab=!0;switch(z){case Og:case U:if(z<=a)continue a;break a;case Pg:case Qg:case Rg:if(null===d)break a;if(!Ab&&z<=a)continue a;break a;case T:break a;default:w("181")}}while(1)}}function p(a,b){Da?w("182"):void 0;Da=!0;var c=O,d=!1,e=null;try{k(a,b)}catch(Kd){d=!0,e=Kd}for(;d;){if(Ya){Ja=e;break}var h=I;if(null===h)Ya=!0;else{var p=x(h,e);null===p?w("183"):void 0;if(!Ya){try{d=
p;e=a;p=b;for(var q=d;null!==h;){switch(h.tag){case eh:Ig(h);break;case ch:m(h);break;case bh:r(h);break;case dh:r(h)}if(h===q||h.alternate===q)break;h=h["return"]}I=f(d);k(e,p)}catch(Kd){d=!0;e=Kd;continue}break}}}O=c;null!==b&&(Bb=!1);z>U&&!Bb&&($f(g),Bb=!0);a=Ja;Ya=Ab=Da=!1;nc=Ka=P=Ja=null;oc=0;if(null!==a)throw a;}function x(a,b){var c=Kg.current=null,d=!1,e=!1,f=null;if(a.tag===bh)c=a,S(a)&&(Ya=!0);else for(var g=a["return"];null!==g&&null===c;){g.tag===eh?"function"===typeof g.stateNode.componentDidCatch&&
(d=!0,f=Ra(g),c=g,e=!0):g.tag===bh&&(c=g);if(S(g)){if(Id||null!==va&&(va.has(g)||null!==g.alternate&&va.has(g.alternate)))return null;c=null;e=!1}g=g["return"]}if(null!==c){null===Ka&&(Ka=new Set);Ka.add(c);var h="";g=a;do{a:switch(g.tag){case fe:case ge:case he:case ie:var k=g._debugOwner,m=g._debugSource;var p=Ra(g);var q=null;k&&(q=Ra(k));k=m;p="\n    in "+(p||"Unknown")+(k?" (at "+k.fileName.replace(/^.*[\\\/]/,"")+":"+k.lineNumber+")":q?" (created by "+q+")":"");break a;default:p=""}h+=p;g=g["return"]}while(g);
g=h;a=Ra(a);null===P&&(P=new Map);b={componentName:a,componentStack:g,error:b,errorBoundary:d?c.stateNode:null,errorBoundaryFound:d,errorBoundaryName:f,willRetry:e};P.set(c,b);try{console.error(b.error)}catch(Wi){console.error(Wi)}Hd?(null===va&&(va=new Set),va.add(c)):H(c);return c}null===Ja&&(Ja=b);return null}function S(a){return null!==Ka&&(Ka.has(a)||null!==a.alternate&&Ka.has(a.alternate))}function D(a,b){return y(a,b,!1)}function y(a,b){oc>Xi&&(Ya=!0,w("185"));!Da&&b<=z&&(I=null);for(var c=
!0;null!==a&&c;){c=!1;if(a.pendingWorkPriority===T||a.pendingWorkPriority>b)c=!0,a.pendingWorkPriority=b;null!==a.alternate&&(a.alternate.pendingWorkPriority===T||a.alternate.pendingWorkPriority>b)&&(c=!0,a.alternate.pendingWorkPriority=b);if(null===a["return"])if(a.tag===bh){var d=a.stateNode;b===T||d.isScheduled||(d.isScheduled=!0,zb?zb.nextScheduledRoot=d:ma=d,zb=d);if(!Da)switch(b){case Og:pc?p(Og,null):p(U,null);break;case U:W?void 0:w("186");break;default:Bb||($f(g),Bb=!0)}}else break;a=a["return"]}}
function B(a,b){var c=O;c===T&&(c=!Yi||a.internalContextTag&Sg||b?Qg:Og);return c===Og&&(Da||W)?U:c}function H(a){y(a,U,!0)}var C=Ag(a),Ca=Hg(a),r=C.popHostContainer,m=C.popHostContext,t=C.resetHostContainer,v=Lf(a,C,Ca,D,B),V=v.beginWork,ld=v.beginFailedWork,Lh=eg(a,C,Ca).completeWork;C=vg(a,x);var q=C.commitPlacement,Mh=C.commitDeletion,vf=C.commitWork,Nh=C.commitLifeCycles,Oh=C.commitAttachRef,Ph=C.commitDetachRef,$f=a.scheduleDeferredCallback,Yi=a.useSyncScheduling,Ui=a.prepareForCommit,Vi=a.resetAfterCommit,
O=T,Da=!1,Ab=!1,W=!1,pc=!1,I=null,z=T,u=null,na=null,ma=null,zb=null,Bb=!1,P=null,Ka=null,va=null,Ja=null,Ya=!1,Hd=!1,Id=!1,Xi=1E3,oc=0,nc=null;return{scheduleUpdate:D,getPriorityContext:B,batchedUpdates:function(a,b){var c=W;W=!0;try{return a(b)}finally{W=c,Da||W||p(U,null)}},unbatchedUpdates:function(a){var b=pc,c=W;pc=W;W=!1;try{return a()}finally{W=c,pc=b}},flushSync:function(a){var b=W,c=O;W=!0;O=Og;try{return a()}finally{W=b,O=c,Da?w("187"):void 0,p(U,null)}},deferredUpdates:function(a){var b=
O;O=Qg;try{return a()}finally{O=b}}}}function ih(){w("196")}function jh(a){if(!a)return da;a=Pa.get(a);return"number"===typeof a.tag?ih(a):a._processChildContext(a._context)}jh._injectFiber=function(a){ih=a};var kh=ud.addTopLevelUpdate,lh=R.findCurrentUnmaskedContext,mh=R.isContextProvider,nh=R.processChildContext,oh=E.HostComponent,ph=bb.findCurrentHostFiber,qh=bb.findCurrentHostFiberWithNoPortals;jh._injectFiber(function(a){var b=lh(a);return mh(a)?nh(a,b,!1):b});var rh=F.TEXT_NODE;
function sh(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function th(a,b){var c=sh(a);a=0;for(var d;c;){if(c.nodeType===rh){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=sh(c)}}var uh=null;function vh(){!uh&&l.canUseDOM&&(uh="textContent"in document.documentElement?"textContent":"innerText");return uh}
var wh={getOffsets:function(a){var b=window.getSelection&&window.getSelection();if(!b||0===b.rangeCount)return null;var c=b.anchorNode,d=b.anchorOffset,e=b.focusNode,f=b.focusOffset,g=b.getRangeAt(0);try{g.startContainer.nodeType,g.endContainer.nodeType}catch(k){return null}b=b.anchorNode===b.focusNode&&b.anchorOffset===b.focusOffset?0:g.toString().length;var h=g.cloneRange();h.selectNodeContents(a);h.setEnd(g.startContainer,g.startOffset);a=h.startContainer===h.endContainer&&h.startOffset===h.endOffset?
0:h.toString().length;g=a+b;b=document.createRange();b.setStart(c,d);b.setEnd(e,f);c=b.collapsed;return{start:c?g:a,end:c?a:g}},setOffsets:function(a,b){if(window.getSelection){var c=window.getSelection(),d=a[vh()].length,e=Math.min(b.start,d);b=void 0===b.end?e:Math.min(b.end,d);!c.extend&&e>b&&(d=b,b=e,e=d);d=th(a,e);a=th(a,b);if(d&&a){var f=document.createRange();f.setStart(d.node,d.offset);c.removeAllRanges();e>b?(c.addRange(f),c.extend(a.node,a.offset)):(f.setEnd(a.node,a.offset),c.addRange(f))}}}},
xh=F.ELEMENT_NODE,yh={hasSelectionCapabilities:function(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&"text"===a.type||"textarea"===b||"true"===a.contentEditable)},getSelectionInformation:function(){var a=ia();return{focusedElem:a,selectionRange:yh.hasSelectionCapabilities(a)?yh.getSelection(a):null}},restoreSelection:function(a){var b=ia(),c=a.focusedElem;a=a.selectionRange;if(b!==c&&fa(document.documentElement,c)){yh.hasSelectionCapabilities(c)&&yh.setSelection(c,a);b=
[];for(a=c;a=a.parentNode;)a.nodeType===xh&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});ha(c);for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}},getSelection:function(a){return("selectionStart"in a?{start:a.selectionStart,end:a.selectionEnd}:wh.getOffsets(a))||{start:0,end:0}},setSelection:function(a,b){var c=b.start,d=b.end;void 0===d&&(d=c);"selectionStart"in a?(a.selectionStart=c,a.selectionEnd=Math.min(d,a.value.length)):wh.setOffsets(a,b)}},zh=yh,
Ah=F.ELEMENT_NODE;function Bh(){w("211")}function Ch(){w("212")}function Dh(a){if(null==a)return null;if(a.nodeType===Ah)return a;var b=Pa.get(a);if(b)return"number"===typeof b.tag?Bh(b):Ch(b);"function"===typeof a.render?w("188"):w("213",Object.keys(a))}Dh._injectFiber=function(a){Bh=a};Dh._injectStack=function(a){Ch=a};var Eh=E.HostComponent;function Fh(a){if(void 0!==a._hostParent)return a._hostParent;if("number"===typeof a.tag){do a=a["return"];while(a&&a.tag!==Eh);if(a)return a}return null}
function Gh(a,b){for(var c=0,d=a;d;d=Fh(d))c++;d=0;for(var e=b;e;e=Fh(e))d++;for(;0<c-d;)a=Fh(a),c--;for(;0<d-c;)b=Fh(b),d--;for(;c--;){if(a===b||a===b.alternate)return a;a=Fh(a);b=Fh(b)}return null}
var Hh={isAncestor:function(a,b){for(;b;){if(a===b||a===b.alternate)return!0;b=Fh(b)}return!1},getLowestCommonAncestor:Gh,getParentInstance:function(a){return Fh(a)},traverseTwoPhase:function(a,b,c){for(var d=[];a;)d.push(a),a=Fh(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c)},traverseEnterLeave:function(a,b,c,d,e){for(var f=a&&b?Gh(a,b):null,g=[];a&&a!==f;)g.push(a),a=Fh(a);for(a=[];b&&b!==f;)a.push(b),b=Fh(b);for(b=0;b<g.length;b++)c(g[b],"bubbled",d);for(b=
a.length;0<b--;)c(a[b],"captured",e)}},Ih=Jb.getListener;function Jh(a,b,c){if(b=Ih(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Cb(c._dispatchListeners,b),c._dispatchInstances=Cb(c._dispatchInstances,a)}function Kh(a){a&&a.dispatchConfig.phasedRegistrationNames&&Hh.traverseTwoPhase(a._targetInst,Jh,a)}function Qh(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?Hh.getParentInstance(b):null;Hh.traverseTwoPhase(b,Jh,a)}}
function Rh(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ih(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Cb(c._dispatchListeners,b),c._dispatchInstances=Cb(c._dispatchInstances,a))}function Sh(a){a&&a.dispatchConfig.registrationName&&Rh(a._targetInst,null,a)}
var Th={accumulateTwoPhaseDispatches:function(a){Db(a,Kh)},accumulateTwoPhaseDispatchesSkipTarget:function(a){Db(a,Qh)},accumulateDirectDispatches:function(a){Db(a,Sh)},accumulateEnterLeaveDispatches:function(a,b,c,d){Hh.traverseEnterLeave(c,d,Rh,a,b)}},X={_root:null,_startText:null,_fallbackText:null},Uh={initialize:function(a){X._root=a;X._startText=Uh.getText();return!0},reset:function(){X._root=null;X._startText=null;X._fallbackText=null},getData:function(){if(X._fallbackText)return X._fallbackText;
var a,b=X._startText,c=b.length,d,e=Uh.getText(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);X._fallbackText=e.slice(a,1<d?1-d:void 0);return X._fallbackText},getText:function(){return"value"in X._root?X._root.value:X._root[vh()]}},Vh=Uh,Wh="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),Xh={type:null,target:null,currentTarget:ca.thatReturnsNull,eventPhase:null,bubbles:null,
cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
function Y(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?ca.thatReturnsTrue:ca.thatReturnsFalse;this.isPropagationStopped=ca.thatReturnsFalse;return this}
n(Y.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=ca.thatReturnsTrue)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=ca.thatReturnsTrue)},persist:function(){this.isPersistent=ca.thatReturnsTrue},isPersistent:ca.thatReturnsFalse,
destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<Wh.length;a++)this[Wh[a]]=null}});Y.Interface=Xh;Y.augmentClass=function(a,b){function c(){}c.prototype=this.prototype;var d=new c;n(d,a.prototype);a.prototype=d;a.prototype.constructor=a;a.Interface=n({},this.Interface,b);a.augmentClass=this.augmentClass;Yh(a)};Yh(Y);function Zh(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}
function $h(a){a instanceof this?void 0:w("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function Yh(a){a.eventPool=[];a.getPooled=Zh;a.release=$h}function ai(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(ai,{data:null});function bi(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(bi,{data:null});var ci=[9,13,27,32],di=l.canUseDOM&&"CompositionEvent"in window,ei=null;l.canUseDOM&&"documentMode"in document&&(ei=document.documentMode);var fi;
if(fi=l.canUseDOM&&"TextEvent"in window&&!ei){var gi=window.opera;fi=!("object"===typeof gi&&"function"===typeof gi.version&&12>=parseInt(gi.version(),10))}
var hi=fi,ii=l.canUseDOM&&(!di||ei&&8<ei&&11>=ei),ji=String.fromCharCode(32),ki={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["topCompositionEnd","topKeyPress","topTextInput","topPaste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ")}},li=!1;
function mi(a,b){switch(a){case "topKeyUp":return-1!==ci.indexOf(b.keyCode);case "topKeyDown":return 229!==b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":return!0;default:return!1}}function ni(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var oi=!1;function pi(a,b){switch(a){case "topCompositionEnd":return ni(b);case "topKeyPress":if(32!==b.which)return null;li=!0;return ji;case "topTextInput":return a=b.data,a===ji&&li?null:a;default:return null}}
function qi(a,b){if(oi)return"topCompositionEnd"===a||!di&&mi(a,b)?(a=Vh.getData(),Vh.reset(),oi=!1,a):null;switch(a){case "topPaste":return null;case "topKeyPress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "topCompositionEnd":return ii?null:b.data;default:return null}}
var ri={eventTypes:ki,extractEvents:function(a,b,c,d){var e;if(di)b:{switch(a){case "topCompositionStart":var f=ki.compositionStart;break b;case "topCompositionEnd":f=ki.compositionEnd;break b;case "topCompositionUpdate":f=ki.compositionUpdate;break b}f=void 0}else oi?mi(a,c)&&(f=ki.compositionEnd):"topKeyDown"===a&&229===c.keyCode&&(f=ki.compositionStart);f?(ii&&(oi||f!==ki.compositionStart?f===ki.compositionEnd&&oi&&(e=Vh.getData()):oi=Vh.initialize(d)),f=ai.getPooled(f,b,c,d),e?f.data=e:(e=ni(c),
null!==e&&(f.data=e)),Th.accumulateTwoPhaseDispatches(f),e=f):e=null;(a=hi?pi(a,c):qi(a,c))?(b=bi.getPooled(ki.beforeInput,b,c,d),b.data=a,Th.accumulateTwoPhaseDispatches(b)):b=null;return[e,b]}},si={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ti(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!si[a.type]:"textarea"===b?!0:!1}
var ui={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ")}};function vi(a,b,c){a=Y.getPooled(ui.change,a,b,c);a.type="change";nb.enqueueStateRestore(c);Th.accumulateTwoPhaseDispatches(a);return a}var wi=null,xi=null;function yi(a){Jb.enqueueEvents(a);Jb.processEventQueue(!1)}
function zi(a){var b=G.getNodeFromInstance(a);if(Bc.updateValueIfChanged(b))return a}function Ai(a,b){if("topChange"===a)return b}var Bi=!1;l.canUseDOM&&(Bi=Lb("input")&&(!document.documentMode||9<document.documentMode));function Ci(){wi&&(wi.detachEvent("onpropertychange",Di),xi=wi=null)}function Di(a){"value"===a.propertyName&&zi(xi)&&(a=vi(xi,a,ub(a)),sb.batchedUpdates(yi,a))}function Ei(a,b,c){"topFocus"===a?(Ci(),wi=b,xi=c,wi.attachEvent("onpropertychange",Di)):"topBlur"===a&&Ci()}
function Fi(a){if("topSelectionChange"===a||"topKeyUp"===a||"topKeyDown"===a)return zi(xi)}function Gi(a,b){if("topClick"===a)return zi(b)}function Hi(a,b){if("topInput"===a||"topChange"===a)return zi(b)}
var Ii={eventTypes:ui,_isInputEventSupported:Bi,extractEvents:function(a,b,c,d){var e=b?G.getNodeFromInstance(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=Ai;else if(ti(e))if(Bi)g=Hi;else{g=Fi;var h=Ei}else f=e.nodeName,!f||"input"!==f.toLowerCase()||"checkbox"!==e.type&&"radio"!==e.type||(g=Gi);if(g&&(g=g(a,b)))return vi(g,c,d);h&&h(a,e,b);"topBlur"===a&&null!=b&&(a=b._wrapperState||e._wrapperState)&&a.controlled&&"number"===e.type&&(a=""+e.value,
e.getAttribute("value")!==a&&e.setAttribute("value",a))}};function Ji(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(Ji,{view:function(a){if(a.view)return a.view;a=ub(a);return a.window===a?a:(a=a.ownerDocument)?a.defaultView||a.parentWindow:window},detail:function(a){return a.detail||0}});var Ki={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Li(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Ki[a])?!!b[a]:!1}function Mi(){return Li}
function Ni(a,b,c,d){return Y.call(this,a,b,c,d)}Ji.augmentClass(Ni,{screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Mi,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}});
var Oi={mouseEnter:{registrationName:"onMouseEnter",dependencies:["topMouseOut","topMouseOver"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["topMouseOut","topMouseOver"]}},Pi={eventTypes:Oi,extractEvents:function(a,b,c,d){if("topMouseOver"===a&&(c.relatedTarget||c.fromElement)||"topMouseOut"!==a&&"topMouseOver"!==a)return null;var e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;"topMouseOut"===a?(a=b,b=(b=c.relatedTarget||c.toElement)?G.getClosestInstanceFromNode(b):
null):a=null;if(a===b)return null;var f=null==a?e:G.getNodeFromInstance(a);e=null==b?e:G.getNodeFromInstance(b);var g=Ni.getPooled(Oi.mouseLeave,a,c,d);g.type="mouseleave";g.target=f;g.relatedTarget=e;c=Ni.getPooled(Oi.mouseEnter,b,c,d);c.type="mouseenter";c.target=e;c.relatedTarget=f;Th.accumulateEnterLeaveDispatches(g,c,a,b);return[g,c]}},Qi=F.DOCUMENT_NODE,Ri=l.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Si={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},
dependencies:"topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ")}},Ti=null,Zi=null,$i=null,aj=!1,bj=M.isListeningToAllDependencies;
function cj(a,b){if(aj||null==Ti||Ti!==ia())return null;var c=Ti;"selectionStart"in c&&zh.hasSelectionCapabilities(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return $i&&ea($i,c)?null:($i=c,a=Y.getPooled(Si.select,Zi,a,b),a.type="select",a.target=Ti,Th.accumulateTwoPhaseDispatches(a),a)}
var dj={eventTypes:Si,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:d.nodeType===Qi?d:d.ownerDocument;if(!e||!bj("onSelect",e))return null;e=b?G.getNodeFromInstance(b):window;switch(a){case "topFocus":if(ti(e)||"true"===e.contentEditable)Ti=e,Zi=b,$i=null;break;case "topBlur":$i=Zi=Ti=null;break;case "topMouseDown":aj=!0;break;case "topContextMenu":case "topMouseUp":return aj=!1,cj(c,d);case "topSelectionChange":if(Ri)break;case "topKeyDown":case "topKeyUp":return cj(c,d)}return null}};
function ej(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(ej,{animationName:null,elapsedTime:null,pseudoElement:null});function fj(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(fj,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}});function gj(a,b,c,d){return Y.call(this,a,b,c,d)}Ji.augmentClass(gj,{relatedTarget:null});function hj(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;return 32<=a||13===a?a:0}
var ij={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jj={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"};function kj(a,b,c,d){return Y.call(this,a,b,c,d)}
Ji.augmentClass(kj,{key:function(a){if(a.key){var b=ij[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=hj(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?jj[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Mi,charCode:function(a){return"keypress"===a.type?hj(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?hj(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}});function lj(a,b,c,d){return Y.call(this,a,b,c,d)}Ni.augmentClass(lj,{dataTransfer:null});function mj(a,b,c,d){return Y.call(this,a,b,c,d)}Ji.augmentClass(mj,{touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Mi});function nj(a,b,c,d){return Y.call(this,a,b,c,d)}Y.augmentClass(nj,{propertyName:null,elapsedTime:null,pseudoElement:null});
function oj(a,b,c,d){return Y.call(this,a,b,c,d)}Ni.augmentClass(oj,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null});var pj={},qj={};
"abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function(a){var b=a[0].toUpperCase()+
a.slice(1),c="on"+b;b="top"+b;c={phasedRegistrationNames:{bubbled:c,captured:c+"Capture"},dependencies:[b]};pj[a]=c;qj[b]=c});
var rj={eventTypes:pj,extractEvents:function(a,b,c,d){var e=qj[a];if(!e)return null;switch(a){case "topAbort":case "topCancel":case "topCanPlay":case "topCanPlayThrough":case "topClose":case "topDurationChange":case "topEmptied":case "topEncrypted":case "topEnded":case "topError":case "topInput":case "topInvalid":case "topLoad":case "topLoadedData":case "topLoadedMetadata":case "topLoadStart":case "topPause":case "topPlay":case "topPlaying":case "topProgress":case "topRateChange":case "topReset":case "topSeeked":case "topSeeking":case "topStalled":case "topSubmit":case "topSuspend":case "topTimeUpdate":case "topToggle":case "topVolumeChange":case "topWaiting":var f=Y;
break;case "topKeyPress":if(0===hj(c))return null;case "topKeyDown":case "topKeyUp":f=kj;break;case "topBlur":case "topFocus":f=gj;break;case "topClick":if(2===c.button)return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":f=Ni;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":f=lj;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":f=
mj;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":f=ej;break;case "topTransitionEnd":f=nj;break;case "topScroll":f=Ji;break;case "topWheel":f=oj;break;case "topCopy":case "topCut":case "topPaste":f=fj}f?void 0:w("86",a);a=f.getPooled(e,b,c,d);Th.accumulateTwoPhaseDispatches(a);return a}};L.setHandleTopLevel(M.handleTopLevel);Jb.injection.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
ib.injection.injectComponentTree(G);Jb.injection.injectEventPluginsByName({SimpleEventPlugin:rj,EnterLeaveEventPlugin:Pi,ChangeEventPlugin:Ii,SelectEventPlugin:dj,BeforeInputEventPlugin:ri});
var sj=A.injection.MUST_USE_PROPERTY,Z=A.injection.HAS_BOOLEAN_VALUE,tj=A.injection.HAS_NUMERIC_VALUE,uj=A.injection.HAS_POSITIVE_NUMERIC_VALUE,vj=A.injection.HAS_STRING_BOOLEAN_VALUE,wj={Properties:{allowFullScreen:Z,allowTransparency:vj,async:Z,autoPlay:Z,capture:Z,checked:sj|Z,cols:uj,contentEditable:vj,controls:Z,"default":Z,defer:Z,disabled:Z,download:A.injection.HAS_OVERLOADED_BOOLEAN_VALUE,draggable:vj,formNoValidate:Z,hidden:Z,loop:Z,multiple:sj|Z,muted:sj|Z,noValidate:Z,open:Z,playsInline:Z,
readOnly:Z,required:Z,reversed:Z,rows:uj,rowSpan:tj,scoped:Z,seamless:Z,selected:sj|Z,size:uj,start:tj,span:uj,spellCheck:vj,style:0,itemScope:Z,acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,value:vj},DOMAttributeNames:{acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv"},DOMMutationMethods:{value:function(a,b){if(null==b)return a.removeAttribute("value");"number"!==a.type||!1===a.hasAttribute("value")?a.setAttribute("value",""+b):a.validity&&!a.validity.badInput&&
a.ownerDocument.activeElement!==a&&a.setAttribute("value",""+b)}}},xj=A.injection.HAS_STRING_BOOLEAN_VALUE,yj={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},zj={Properties:{autoReverse:xj,externalResourcesRequired:xj,preserveAlpha:xj},DOMAttributeNames:{autoReverse:"autoReverse",externalResourcesRequired:"externalResourcesRequired",preserveAlpha:"preserveAlpha"},DOMAttributeNamespaces:{xlinkActuate:yj.xlink,xlinkArcrole:yj.xlink,xlinkHref:yj.xlink,xlinkRole:yj.xlink,
xlinkShow:yj.xlink,xlinkTitle:yj.xlink,xlinkType:yj.xlink,xmlBase:yj.xml,xmlLang:yj.xml,xmlSpace:yj.xml}},Aj=/[\-\:]([a-z])/g;function Bj(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function(a){var b=a.replace(Aj,
Bj);zj.Properties[b]=0;zj.DOMAttributeNames[b]=a});A.injection.injectDOMPropertyConfig(wj);A.injection.injectDOMPropertyConfig(zj);
var Cj=ig.injectInternals,Dj=F.ELEMENT_NODE,Ej=F.TEXT_NODE,Fj=F.COMMENT_NODE,Gj=F.DOCUMENT_NODE,Hj=F.DOCUMENT_FRAGMENT_NODE,Ij=A.ROOT_ATTRIBUTE_NAME,Jj=ka.getChildNamespace,Kj=N.createElement,Lj=N.createTextNode,Mj=N.setInitialProperties,Nj=N.diffProperties,Oj=N.updateProperties,Pj=N.diffHydratedProperties,Qj=N.diffHydratedText,Rj=N.warnForDeletedHydratableElement,Sj=N.warnForDeletedHydratableText,Tj=N.warnForInsertedHydratedElement,Uj=N.warnForInsertedHydratedText,Vj=G.precacheFiberNode,Wj=G.updateFiberProps;
nb.injection.injectFiberControlledHostComponent(N);Dh._injectFiber(function(a){return Xj.findHostInstance(a)});var Yj=null,Zj=null;function ak(a){return!(!a||a.nodeType!==Dj&&a.nodeType!==Gj&&a.nodeType!==Hj&&(a.nodeType!==Fj||" react-mount-point-unstable "!==a.nodeValue))}function bk(a){a=a?a.nodeType===Gj?a.documentElement:a.firstChild:null;return!(!a||a.nodeType!==Dj||!a.hasAttribute(Ij))}
var Xj=function(a){var b=a.getPublicInstance;a=hh(a);var c=a.scheduleUpdate,d=a.getPriorityContext;return{createContainer:function(a){var b=ee();a={current:b,containerInfo:a,isScheduled:!1,nextScheduledRoot:null,context:null,pendingContext:null};return b.stateNode=a},updateContainer:function(a,b,g,h){var e=b.current;g=jh(g);null===b.context?b.context=g:b.pendingContext=g;b=h;h=d(e,ed.enableAsyncSubtreeAPI&&null!=a&&null!=a.type&&null!=a.type.prototype&&!0===a.type.prototype.unstable_isAsyncReactComponent);
a={element:a};kh(e,a,void 0===b?null:b,h);c(e,h)},batchedUpdates:a.batchedUpdates,unbatchedUpdates:a.unbatchedUpdates,deferredUpdates:a.deferredUpdates,flushSync:a.flushSync,getPublicRootInstance:function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case oh:return b(a.child.stateNode);default:return a.child.stateNode}},findHostInstance:function(a){a=ph(a);return null===a?null:a.stateNode},findHostInstanceWithNoPortals:function(a){a=qh(a);return null===a?null:a.stateNode}}}({getRootHostContext:function(a){if(a.nodeType===
Gj)a=(a=a.documentElement)?a.namespaceURI:Jj(null,"");else{var b=a.nodeType===Fj?a.parentNode:a;a=b.namespaceURI||null;b=b.tagName;a=Jj(a,b)}return a},getChildHostContext:function(a,b){return Jj(a,b)},getPublicInstance:function(a){return a},prepareForCommit:function(){Yj=M.isEnabled();Zj=zh.getSelectionInformation();M.setEnabled(!1)},resetAfterCommit:function(){zh.restoreSelection(Zj);Zj=null;M.setEnabled(Yj);Yj=null},createInstance:function(a,b,c,d,e){a=Kj(a,b,c,d);Vj(e,a);Wj(a,b);return a},appendInitialChild:function(a,
b){a.appendChild(b)},finalizeInitialChildren:function(a,b,c,d){Mj(a,b,c,d);a:{switch(b){case "button":case "input":case "select":case "textarea":a=!!c.autoFocus;break a}a=!1}return a},prepareUpdate:function(a,b,c,d,e){return Nj(a,b,c,d,e)},commitMount:function(a){a.focus()},commitUpdate:function(a,b,c,d,e){Wj(a,e);Oj(a,b,c,d,e)},shouldSetTextContent:function(a,b){return"textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&
"string"===typeof b.dangerouslySetInnerHTML.__html},resetTextContent:function(a){a.textContent=""},shouldDeprioritizeSubtree:function(a,b){return!!b.hidden},createTextInstance:function(a,b,c,d){a=Lj(a,b);Vj(d,a);return a},commitTextUpdate:function(a,b,c){a.nodeValue=c},appendChild:function(a,b){a.appendChild(b)},appendChildToContainer:function(a,b){a.nodeType===Fj?a.parentNode.insertBefore(b,a):a.appendChild(b)},insertBefore:function(a,b,c){a.insertBefore(b,c)},insertInContainerBefore:function(a,
b,c){a.nodeType===Fj?a.parentNode.insertBefore(b,c):a.insertBefore(b,c)},removeChild:function(a,b){a.removeChild(b)},removeChildFromContainer:function(a,b){a.nodeType===Fj?a.parentNode.removeChild(b):a.removeChild(b)},canHydrateInstance:function(a,b){return a.nodeType===Dj&&b===a.nodeName.toLowerCase()},canHydrateTextInstance:function(a,b){return""===b?!1:a.nodeType===Ej},getNextHydratableSibling:function(a){for(a=a.nextSibling;a&&a.nodeType!==Dj&&a.nodeType!==Ej;)a=a.nextSibling;return a},getFirstHydratableChild:function(a){for(a=
a.firstChild;a&&a.nodeType!==Dj&&a.nodeType!==Ej;)a=a.nextSibling;return a},hydrateInstance:function(a,b,c,d,e,f){Vj(f,a);Wj(a,c);return Pj(a,b,c,e,d)},hydrateTextInstance:function(a,b,c){Vj(c,a);return Qj(a,b)},didNotHydrateInstance:function(a,b){1===b.nodeType?Rj(a,b):Sj(a,b)},didNotFindHydratableInstance:function(a,b,c){Tj(a,b,c)},didNotFindHydratableTextInstance:function(a,b){Uj(a,b)},scheduleDeferredCallback:dd.rIC,useSyncScheduling:!0});sb.injection.injectFiberBatchedUpdates(Xj.batchedUpdates);
function ck(a,b,c,d,e){ak(c)?void 0:w("200");var f=c._reactRootContainer;if(f)Xj.updateContainer(b,f,a,e);else{if(!d&&!bk(c))for(d=void 0;d=c.lastChild;)c.removeChild(d);var g=Xj.createContainer(c);f=c._reactRootContainer=g;Xj.unbatchedUpdates(function(){Xj.updateContainer(b,g,a,e)})}return Xj.getPublicRootInstance(f)}function dk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;ak(b)?void 0:w("200");return ne.createPortal(a,b,null,c)}
var ek={createPortal:dk,hydrate:function(a,b,c){return ck(null,a,b,!0,c)},render:function(a,b,c){return ck(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null!=a&&Pa.has(a)?void 0:w("38");return ck(a,b,c,!1,d)},unmountComponentAtNode:function(a){ak(a)?void 0:w("40");return a._reactRootContainer?(Xj.unbatchedUpdates(function(){ck(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},findDOMNode:Dh,unstable_createPortal:dk,unstable_batchedUpdates:sb.batchedUpdates,
unstable_deferredUpdates:Xj.deferredUpdates,flushSync:Xj.flushSync,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:Jb,EventPluginRegistry:sa,EventPropagators:Th,ReactControlledComponent:nb,ReactDOMComponentTree:G,ReactDOMEventListener:L}};Cj({findFiberByHostInstance:G.getClosestInstanceFromNode,findHostInstanceByFiber:Xj.findHostInstance,bundleType:0,version:"16.0.0",rendererPackageName:"react-dom"});module.exports=ek;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var emptyFunction = __webpack_require__(1);

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (false) {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(26);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(27);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_landing_page_LandingPage__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_footer_Footer__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_modal_QrModal__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__App_css__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__App_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__App_css__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      modalId: null
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "App" },
        (this.state.modalId === "cozQRModal" || this.state.modalId === "neonWallet") && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_modal_QrModal__["a" /* default */], {
          modalId: this.state.modalId,
          handleModalClose: function handleModalClose() {
            _this2.setState({ modalId: null });
          }
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_landing_page_LandingPage__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_footer_Footer__["a" /* default */], { handleModalClick: function handleModalClick(id) {
            return _this2.setState({ modalId: id });
          } })
      );
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DownloadOptions__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_NEON_logo_svg__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_NEON_logo_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_NEON_logo_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_screenshot_png__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_screenshot_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__images_screenshot_png__);





// import coz from "../../images/coz.svg";

var LandingPage = function LandingPage() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "landing-page-container" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { id: "details-container" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { id: "details" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { id: "neon-logo", src: __WEBPACK_IMPORTED_MODULE_3__images_NEON_logo_svg___default.a }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { id: "description" },
          "An open source ",
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "span",
            { id: "gold" },
            " cross-platform light wallet"
          ),
          "for the NEO blockchain available on Windows, Mac OS, and Linux."
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__DownloadOptions__["a" /* default */], { options: __WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* downloadOptions */] })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { id: "screen-shot" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { id: "screen-shot-container" })
    )
  );
};

// NOT IN USE
// const Navigation = () => (
//   <nav>
//     <a href="https://cityofzion.io/">
//       <img src={coz} />
//     </a>
//   </nav>
// );

/* harmony default export */ __webpack_exports__["a"] = (LandingPage);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var DownloadOptions = function DownloadOptions(_ref) {
  var options = _ref.options;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { id: "download-options-container" },
    options.map(function (option) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { key: option.id, id: "option" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { id: "display" },
          option.display
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { id: "size" },
          option.size
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(DownloadButton, { downloadLink: option.href, icon: option.icon })
      );
    })
  );
};

var DownloadButton = function DownloadButton(_ref2) {
  var downloadLink = _ref2.downloadLink,
      icon = _ref2.icon;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "a",
    { href: downloadLink },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { id: "download-button" },
      "Download ",
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: icon })
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (DownloadOptions);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return downloadOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_linux_logo_png__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__images_linux_logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__images_linux_logo_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_apple_logo_png__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_apple_logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__images_apple_logo_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_windows_logo_png__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_windows_logo_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__images_windows_logo_png__);




var downloadOptions = [{
  id: "WINDOWS",
  display: "Windows",
  href: "https://github.com/CityOfZion/neon-wallet/releases/download/0.1.0/Neon.Setup.0.1.0.Windows.exe",
  icon: __WEBPACK_IMPORTED_MODULE_2__images_windows_logo_png___default.a,
  size: "134.56mb (Neon.exe)"
}, {
  id: "MAC_OS",
  display: "Mac OS",
  href: "https://github.com/CityOfZion/neon-wallet/releases/download/0.1.0/Neon-0.1.0.Mac.dmg",
  icon: __WEBPACK_IMPORTED_MODULE_1__images_apple_logo_png___default.a,
  size: "134.56mb (Neon.dmg)"
}, {
  id: "LINUX",
  display: "Linux",
  href: "https://github.com/CityOfZion/neon-wallet/releases/download/0.1.0/Neon_0.1.0_amd64.Linux.deb",
  icon: __WEBPACK_IMPORTED_MODULE_0__images_linux_logo_png___default.a,
  size: "134.56mb (Neon.deb)"
}, {
  id: "LINUX2",
  display: "Linux",
  href: "https://github.com/CityOfZion/neon-wallet/releases/download/0.1.0/Neon-0.1.0-x86_64.Linux.AppImage",
  icon: __WEBPACK_IMPORTED_MODULE_0__images_linux_logo_png___default.a,
  size: "134.56mb (Neon.appimage)"
}];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/linux-logo.993d981b.png";

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/NEON-logo.b2400b40.svg";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/screenshot.9d8e98f8.png";

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_github_png__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__images_github_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__images_github_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_facebook_png__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_facebook_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__images_facebook_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_slack_png__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_slack_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_slack_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_reddit_png__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__images_reddit_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__images_reddit_png__);







var donationLinks = [{
  display: "Donate to City of Zion",
  address: "AXSoNQEKjmqPBNPg5cNrHyWivfjok3Vj9D",
  modalId: "cozQRModal"
}, {
  display: "Donate to NEON wallet creators",
  address: "Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A",
  modalId: "neonWallet"
}];

var Donations = function Donations(_ref) {
  var handleModalClick = _ref.handleModalClick;
  return donationLinks.map(function (e) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { key: e.modalId, id: "donation" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { id: "description" },
        e.display
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { id: "address" },
        e.address
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { id: "modal-link" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "a",
          {
            href: "",
            target: "blank",
            onClick: function onClick(event) {
              return event.preventDefault() || handleModalClick(e.modalId);
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-external-link-square", "aria-hidden": "true" }),
          " Launch QR Code"
        )
      )
    );
  });
};

var Footer = function Footer(_ref2) {
  var handleModalClick = _ref2.handleModalClick;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "footer",
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { id: "footer-content" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Donations, { handleModalClick: handleModalClick }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { id: "social" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { id: "description" },
          "Join us at City of Zion!"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { id: "social-links" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            {
              href: "https://github.com/CityOfZion/neon-wallet",
              id: "link",
              target: "blank"
            },
            "Github ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_1__images_github_png___default.a })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            {
              href: "https://www.facebook.com/CityOfZionOfficial",
              id: "link",
              target: "blank"
            },
            "Facebook ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_2__images_facebook_png___default.a })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "https://discord.gg/R8v48YA", id: "link", target: "blank" },
            "Discord ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_3__images_slack_png___default.a })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "a",
            { href: "https://www.reddit.com/r/NEO/", id: "link", target: "blank" },
            "Reddit ",
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__images_reddit_png___default.a })
          )
        )
      )
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Footer);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/github.56c430b7.png";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/facebook.0256e180.png";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/slack.fe169331.png";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/reddit.d57c13fb.png";

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_modal__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_coz_qr_png__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__images_coz_qr_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__images_coz_qr_png__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_wallet_qr_png__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__images_wallet_qr_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__images_wallet_qr_png__);






var QrModal = function QrModal(_ref) {
  var handleModalClose = _ref.handleModalClose,
      modalId = _ref.modalId;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1_react_modal___default.a,
    {
      isOpen: true,
      onRequestClose: handleModalClose,
      contentLabel: "Modal",
      style: {
        overlay: {
          backgroundColor: "rgba(18, 18, 44, 0.91)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        content: {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          left: "auto",
          right: "auto",
          top: "auto",
          bottom: "auto",
          border: "none",
          borderBottom: "#4696ff solid 5px"
        }
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "div",
      { id: "modal" },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { id: "close-icon", onClick: handleModalClose },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-times-thin fa-2x", "aria-hidden": "true" })
      ),
      modalId === "cozQRModal" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { id: "qr-label" },
          "Donate to City of Zion"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { id: "down-arrow" }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_2__images_coz_qr_png___default.a })
      ),
      modalId === "neonWallet" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { id: "qr-label" },
          "Donate to NEON Wallet Creators"
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { id: "down-arrow" }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_3__images_wallet_qr_png___default.a })
      )
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (QrModal);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__(47);

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Modal2.default;
module.exports = exports["default"];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bodyOpenClassName = exports.portalClassName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(6);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ModalPortal = __webpack_require__(50);

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ariaAppHider = __webpack_require__(9);

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _safeHTMLElement = __webpack_require__(11);

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portalClassName = exports.portalClassName = "ReactModalPortal";
var bodyOpenClassName = exports.bodyOpenClassName = "ReactModal__Body--open";

var isReact16 = _reactDom2.default.createPortal !== undefined;
var createPortal = isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;

function getParentElement(parentSelector) {
  return parentSelector();
}

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function () {
      !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
      var parent = getParentElement(_this.props.parentSelector);
      parent.removeChild(_this.node);
    }, _this.portalRef = function (ref) {
      _this.portal = ref;
    }, _this.renderPortal = function (props) {
      var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends({ defaultStyles: Modal.defaultStyles }, props)), _this.node);
      _this.portalRef(portal);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!_safeHTMLElement.canUseDOM) return;

      if (!isReact16) {
        this.node = document.createElement("div");
      }
      this.node.className = this.props.portalClassName;

      var parent = getParentElement(this.props.parentSelector);
      parent.appendChild(this.node);

      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (!_safeHTMLElement.canUseDOM) return;
      var isOpen = newProps.isOpen;
      // Stop unnecessary renders if modal is remaining closed

      if (!this.props.isOpen && !isOpen) return;

      var currentParent = getParentElement(this.props.parentSelector);
      var newParent = getParentElement(newProps.parentSelector);

      if (newParent !== currentParent) {
        currentParent.removeChild(this.node);
        newParent.appendChild(this.node);
      }

      !isReact16 && this.renderPortal(newProps);
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(newProps) {
      if (!_safeHTMLElement.canUseDOM) return;
      if (newProps.portalClassName !== this.props.portalClassName) {
        this.node.className = newProps.portalClassName;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!_safeHTMLElement.canUseDOM || !this.node || !this.portal) return;

      var state = this.portal.state;
      var now = Date.now();
      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

      if (closesAt) {
        if (!state.beforeClose) {
          this.portal.closeWithTimeout();
        }

        setTimeout(this.removePortal, closesAt - now);
      } else {
        this.removePortal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!_safeHTMLElement.canUseDOM || !isReact16) {
        return null;
      }

      if (!this.node && isReact16) {
        this.node = document.createElement("div");
      }

      return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends({
        ref: this.portalRef,
        defaultStyles: Modal.defaultStyles
      }, this.props)), this.node);
    }
  }], [{
    key: "setAppElement",
    value: function setAppElement(element) {
      ariaAppHider.setElement(element);
    }

    /* eslint-disable react/no-unused-prop-types */

    /* eslint-enable react/no-unused-prop-types */

  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  portalClassName: _propTypes2.default.string,
  bodyOpenClassName: _propTypes2.default.string,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  ariaHideApp: _propTypes2.default.bool,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  parentSelector: _propTypes2.default.func,
  aria: _propTypes2.default.object,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  shouldCloseOnEsc: _propTypes2.default.bool
};
Modal.defaultProps = {
  isOpen: false,
  portalClassName: portalClassName,
  bodyOpenClassName: bodyOpenClassName,
  ariaHideApp: true,
  closeTimeoutMS: 0,
  shouldFocusAfterRender: true,
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  shouldReturnFocusAfterClose: true,
  parentSelector: function parentSelector() {
    return document.body;
  }
};
Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px"
  }
};
exports.default = Modal;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(1);
var invariant = __webpack_require__(3);
var ReactPropTypesSecret = __webpack_require__(49);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _focusManager = __webpack_require__(51);

var focusManager = _interopRequireWildcard(_focusManager);

var _scopeTab = __webpack_require__(52);

var _scopeTab2 = _interopRequireDefault(_scopeTab);

var _ariaAppHider = __webpack_require__(9);

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _refCount = __webpack_require__(10);

var refCount = _interopRequireWildcard(_refCount);

var _bodyClassList = __webpack_require__(53);

var bodyClassList = _interopRequireWildcard(_bodyClassList);

var _safeHTMLElement = __webpack_require__(11);

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: "ReactModal__Overlay",
  content: "ReactModal__Content"
};

var TAB_KEY = 9;
var ESC_KEY = 27;

var ModalPortal = function (_Component) {
  _inherits(ModalPortal, _Component);

  function ModalPortal(props) {
    _classCallCheck(this, ModalPortal);

    var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, props));

    _this.setFocusAfterRender = function (focus) {
      _this.focusAfterRender = _this.props.shouldFocusAfterRender && focus;
    };

    _this.setOverlayRef = function (overlay) {
      _this.overlay = overlay;
    };

    _this.setContentRef = function (content) {
      _this.content = content;
    };

    _this.afterClose = function () {
      // Remove body class
      bodyClassList.remove(_this.props.bodyOpenClassName);

      if (_this.shouldReturnFocus()) {
        focusManager.returnFocus();
        focusManager.teardownScopedFocus();
      }
    };

    _this.shouldReturnFocus = function () {
      // Don't restore focus to the element that had focus prior to
      // the modal's display if:
      // 1. Focus was never shifted to the modal in the first place
      //    (shouldFocusAfterRender = false)
      // 2. Explicit direction to not restore focus
      return _this.props.shouldFocusAfterRender || _this.props.shouldReturnFocusAfterClose;
    };

    _this.open = function () {
      _this.beforeOpen();
      if (_this.state.afterOpen && _this.state.beforeClose) {
        clearTimeout(_this.closeTimer);
        _this.setState({ beforeClose: false });
      } else {
        if (_this.shouldReturnFocus()) {
          focusManager.setupScopedFocus(_this.node);
          focusManager.markForFocusLater();
        }

        _this.setState({ isOpen: true }, function () {
          _this.setState({ afterOpen: true });

          if (_this.props.isOpen && _this.props.onAfterOpen) {
            _this.props.onAfterOpen();
          }
        });
      }
    };

    _this.close = function () {
      _this.beforeClose();
      if (_this.props.closeTimeoutMS > 0) {
        _this.closeWithTimeout();
      } else {
        _this.closeWithoutTimeout();
      }
    };

    _this.focusContent = function () {
      return _this.content && !_this.contentHasFocus() && _this.content.focus();
    };

    _this.closeWithTimeout = function () {
      var closesAt = Date.now() + _this.props.closeTimeoutMS;
      _this.setState({ beforeClose: true, closesAt: closesAt }, function () {
        _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
      });
    };

    _this.closeWithoutTimeout = function () {
      _this.setState({
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null
      }, _this.afterClose);
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === TAB_KEY) {
        (0, _scopeTab2.default)(_this.content, event);
      }

      if (_this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
        event.preventDefault();
        _this.requestClose(event);
      }
    };

    _this.handleOverlayOnClick = function (event) {
      if (_this.shouldClose === null) {
        _this.shouldClose = true;
      }

      if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
        if (_this.ownerHandlesClose()) {
          _this.requestClose(event);
        } else {
          _this.focusContent();
        }
      }
      _this.shouldClose = null;
      _this.moveFromContentToOverlay = null;
    };

    _this.handleOverlayOnMouseUp = function () {
      if (_this.moveFromContentToOverlay === null) {
        _this.shouldClose = false;
      }
    };

    _this.handleContentOnMouseUp = function () {
      _this.shouldClose = false;
    };

    _this.handleOverlayOnMouseDown = function () {
      _this.moveFromContentToOverlay = false;
    };

    _this.handleContentOnClick = function () {
      _this.shouldClose = false;
    };

    _this.handleContentOnMouseDown = function () {
      _this.shouldClose = false;
      _this.moveFromContentToOverlay = false;
    };

    _this.requestClose = function (event) {
      return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
    };

    _this.ownerHandlesClose = function () {
      return _this.props.onRequestClose;
    };

    _this.shouldBeClosed = function () {
      return !_this.state.isOpen && !_this.state.beforeClose;
    };

    _this.contentHasFocus = function () {
      return document.activeElement === _this.content || _this.content.contains(document.activeElement);
    };

    _this.buildClassName = function (which, additional) {
      var classNames = (typeof additional === "undefined" ? "undefined" : _typeof(additional)) === "object" ? additional : {
        base: CLASS_NAMES[which],
        afterOpen: CLASS_NAMES[which] + "--after-open",
        beforeClose: CLASS_NAMES[which] + "--before-close"
      };
      var className = classNames.base;
      if (_this.state.afterOpen) {
        className = className + " " + classNames.afterOpen;
      }
      if (_this.state.beforeClose) {
        className = className + " " + classNames.beforeClose;
      }
      return typeof additional === "string" && additional ? className + " " + additional : className;
    };

    _this.ariaAttributes = function (items) {
      return Object.keys(items).reduce(function (acc, name) {
        acc["aria-" + name] = items[name];
        return acc;
      }, {});
    };

    _this.state = {
      afterOpen: false,
      beforeClose: false
    };

    _this.shouldClose = null;
    _this.moveFromContentToOverlay = null;
    return _this;
  }

  _createClass(ModalPortal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Focus needs to be set when mounting and already open
      if (this.props.isOpen) {
        this.setFocusAfterRender(true);
        this.open();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (false) {
        if (newProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
          // eslint-disable-next-line no-console
          console.warn('React-Modal: "bodyOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
        }
      }
      // Focus only needs to be set once when the modal is being opened
      if (!this.props.isOpen && newProps.isOpen) {
        this.setFocusAfterRender(true);
        this.open();
      } else if (this.props.isOpen && !newProps.isOpen) {
        this.close();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.focusAfterRender) {
        this.focusContent();
        this.setFocusAfterRender(false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Remove body class
      bodyClassList.remove(this.props.bodyOpenClassName);
      this.beforeClose();
      clearTimeout(this.closeTimer);
    }
  }, {
    key: "beforeOpen",
    value: function beforeOpen() {
      var _props = this.props,
          appElement = _props.appElement,
          ariaHideApp = _props.ariaHideApp,
          bodyOpenClassName = _props.bodyOpenClassName;
      // Add body class

      bodyClassList.add(bodyOpenClassName);
      // Add aria-hidden to appElement
      if (ariaHideApp) {
        ariaAppHider.hide(appElement);
      }
    }
  }, {
    key: "beforeClose",
    value: function beforeClose() {
      var _props2 = this.props,
          appElement = _props2.appElement,
          ariaHideApp = _props2.ariaHideApp;
      // Reset aria-hidden attribute if all modals have been removed

      if (ariaHideApp && refCount.totalCount() < 1) {
        ariaAppHider.show(appElement);
      }
    }

    // Don't steal focus from inner elements

  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          className = _props3.className,
          overlayClassName = _props3.overlayClassName,
          defaultStyles = _props3.defaultStyles;

      var contentStyles = className ? {} : defaultStyles.content;
      var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

      return this.shouldBeClosed() ? null : _react2.default.createElement(
        "div",
        {
          ref: this.setOverlayRef,
          className: this.buildClassName("overlay", overlayClassName),
          style: _extends({}, overlayStyles, this.props.style.overlay),
          onClick: this.handleOverlayOnClick,
          onMouseDown: this.handleOverlayOnMouseDown,
          onMouseUp: this.handleOverlayOnMouseUp
        },
        _react2.default.createElement(
          "div",
          _extends({
            ref: this.setContentRef,
            style: _extends({}, contentStyles, this.props.style.content),
            className: this.buildClassName("content", className),
            tabIndex: "-1",
            onKeyDown: this.handleKeyDown,
            onMouseDown: this.handleContentOnMouseDown,
            onMouseUp: this.handleContentOnMouseUp,
            onClick: this.handleContentOnClick,
            role: this.props.role,
            "aria-label": this.props.contentLabel
          }, this.ariaAttributes(this.props.aria || {})),
          this.props.children
        )
      );
    }
  }]);

  return ModalPortal;
}(_react.Component);

ModalPortal.defaultProps = {
  style: {
    overlay: {},
    content: {}
  }
};
ModalPortal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  defaultStyles: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  bodyOpenClassName: _propTypes2.default.string,
  ariaHideApp: _propTypes2.default.bool,
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  aria: _propTypes2.default.object,
  children: _propTypes2.default.node,
  shouldCloseOnEsc: _propTypes2.default.bool
};
exports.default = ModalPortal;
module.exports = exports["default"];

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBlur = handleBlur;
exports.handleFocus = handleFocus;
exports.markForFocusLater = markForFocusLater;
exports.returnFocus = returnFocus;
exports.setupScopedFocus = setupScopedFocus;
exports.teardownScopedFocus = teardownScopedFocus;

var _tabbable = __webpack_require__(8);

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var focusLaterElements = [];
var modalElement = null;
var needToFocus = false;

function handleBlur() {
  needToFocus = true;
}

function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(function () {
      if (modalElement.contains(document.activeElement)) {
        return;
      }
      var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}

function markForFocusLater() {
  focusLaterElements.push(document.activeElement);
}

/* eslint-disable no-console */
function returnFocus() {
  var toFocus = null;
  try {
    toFocus = focusLaterElements.pop();
    toFocus.focus();
    return;
  } catch (e) {
    console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
  }
}
/* eslint-enable no-console */

function setupScopedFocus(element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener("blur", handleBlur, false);
    document.addEventListener("focus", handleFocus, true);
  } else {
    window.attachEvent("onBlur", handleBlur);
    document.attachEvent("onFocus", handleFocus);
  }
}

function teardownScopedFocus() {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("focus", handleFocus);
  } else {
    window.detachEvent("onBlur", handleBlur);
    document.detachEvent("onFocus", handleFocus);
  }
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scopeTab;

var _tabbable = __webpack_require__(8);

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scopeTab(node, event) {
  var tabbable = (0, _tabbable2.default)(node);
  if (!tabbable.length) {
    event.preventDefault();
    return;
  }
  var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  var leavingFinalTabbable = finalTabbable === document.activeElement ||
  // handle immediate shift+tab after opening with mouse
  node === document.activeElement;
  if (!leavingFinalTabbable) return;
  event.preventDefault();
  var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  target.focus();
}
module.exports = exports["default"];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.remove = remove;

var _refCount = __webpack_require__(10);

var refCount = _interopRequireWildcard(_refCount);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function add(bodyClass) {
  // Increment class(es) on refCount tracker and add class(es) to body
  bodyClass.split(" ").map(refCount.add).forEach(function (className) {
    return document.body.classList.add(className);
  });
}

function remove(bodyClass) {
  var classListMap = refCount.get();
  // Decrement class(es) from the refCount tracker
  // and remove unused class(es) from body
  bodyClass.split(" ").map(refCount.remove).filter(function (className) {
    return classListMap[className] === 0;
  }).forEach(function (className) {
    return document.body.classList.remove(className);
  });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return ExecutionEnvironment;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU0AAAFNAQMAAAC+Pq+HAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABzklEQVRoge2avXHDMAyFoVOh0iNoFI8mjaZRPIJKFzwjxJ9DxbpcCoFN3mtIk58qHAA+0kQQBEEQVHVj04MmHTe6PXXj7hsr0GzUNwR9ES3MO40v4rWuiIB2QEcJSWxItLjYxzWQL6A9UYmWZMg7WkB7oxYtNuIvgQV6FaqDbnj/IBqaj4Gmo0HUsHme+OSzcwNNQRuNlifWwn8X0AvRmjAD1zPTwxs2zWwr27wD7YRKeuiZyboF7+ElavyOuQU0CZUmoS6u+NJUBiUskAQ0HR01NjVPrGYxSy/Xj+0gCzQblVKlnZuLxcaK11LXnkB7oHqLVId5t85dJ5owdsEEtAPqhUm6RWkNw7KFwQOajtbfsvF9lzFZCvFOJ20D6OWoJ4yYNzKCrYpt806nNQvoxagaaY+Wp8dk/aMWr6OdA5qDvqNlk6XxEqYVaDLqRyW1zYOjpbHWQNNR92x3K1WthfAJ0HQ05I5688n6aaSB5qDHl37JE7KDrF5wM9AO6Pt1Jw6yt/DPJ24DaAp6eOPU9+YSNevs5gloGhr/sQjzJv3jZ8IATUWJ4oKbnPjtTwFAr0R1CFQTxgh/aSOg2Wh0bp9sbS8vQDugEARB0L/WF3iz0YK5scMOAAAAAElFTkSuQmCC"

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAU0AAAFNAQMAAAC+Pq+HAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB1UlEQVRoge2Zu5GEMBBEh1oDkxAIhdDY0AhFIWBiqNBJ85E49tZj5Fy3A4gnq0uaHxEEQRAEZU1JFORzTWkfy/d70R9voN7owY8l0BiHVNB0vE7KqGwG2gF9sTch23Zmt7Z5p7xSNvMK0I6o2pYPTBT/gHZH2SSa00FD8w9oB5TMm2hr+c7iW6wIqD9qkXuyaGEv34M80EfRy54SuaminwRQH1TuLM5fXxdv1K0TaAeUY0Pa6p5SQvBKiR/3OwuoB2o5U0q1hCgLa/avlHO/jAXqgYrWjThyF5P2ErnFuDh8hg2gT6OStmaTrHjLL8TnZBb/CKg7SqR3lizYVbVYUwOoNyrhmQsGPh7ZJA0kdwH1QqMej1o56BHSHh9Qb5RGcSslzVZrziTxA6g/ysqRW0oImTHoyTmuRQVQN7TNcix/tUYeV9RXAXVCo0VuvqrYNmsnRQLaBWWTwiQFw5Kkr826hw2gLqjJBglzTVtt2ADUF22Tfk2VZq2ftbsK1B+t051DhzqTDNj4162XAdQHbWNmcUt6GaZmFlB3VOrnMmkjaWdPf3X0gDqiFrBltFAz2m/GAn0O5ccSSIlAra8EtAuqd1PQ0YImsprREgF1RyEIgqB/rR+PywYpuKaVbgAAAABJRU5ErkJggg=="

/***/ }),
/* 57 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
/* unused harmony export unregister */
// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
// [::1] is the IPv6 localhost address.
window.location.hostname === '[::1]' ||
// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));

function register() {
  if ("production" === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    var publicUrl = new URL("/neon-website", window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', function () {
      var swUrl = "/neon-website" + '/service-worker.js';

      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker.register(swUrl).then(function (registration) {
    registration.onupdatefound = function () {
      var installingWorker = registration.installing;
      installingWorker.onstatechange = function () {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // At this point, the old content will have been purged and
            // the fresh content will have been added to the cache.
            // It's the perfect time to display a "New content is
            // available; please refresh." message in your web app.
            console.log('New content is available; please refresh.');
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.log('Content is cached for offline use.');
          }
        }
      };
    };
  }).catch(function (error) {
    console.error('Error during service worker registration:', error);
  });
}

function checkValidServiceWorker(swUrl) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl).then(function (response) {
    // Ensure service worker exists, and that we really are getting a JS file.
    if (response.status === 404 || response.headers.get('content-type').indexOf('javascript') === -1) {
      // No service worker found. Probably a different app. Reload the page.
      navigator.serviceWorker.ready.then(function (registration) {
        registration.unregister().then(function () {
          window.location.reload();
        });
      });
    } else {
      // Service worker found. Proceed as normal.
      registerValidSW(swUrl);
    }
  }).catch(function () {
    console.log('No internet connection found. App is running in offline mode.');
  });
}

function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.unregister();
    });
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.74b07be7.js.map