/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactIntl = __webpack_require__(6);

var _enzyme = __webpack_require__(2);

var _jsonfile = __webpack_require__(3);

var _jsonfile2 = _interopRequireDefault(_jsonfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = __webpack_require__(4);
var locale = 'en';
var intl = {};
var messages = {};

/**
 * Loads translation file.
 * @param {string} localeFilePath
 * @return {object} messages
 */
function loadTranslation(localeFilePath) {
    if (typeof localeFilePath == "undefined") {
        messages = {};
        return null;
    }
    var fp = path.join(__dirname, localeFilePath);
    messages = _jsonfile2.default.readFileSync("." + fp);
    return messages;
}

/**
 * Equivalent to enzyme's 'shallow' method.
 * @param {string} node React Component that requires react-intl.
 * @return {object}
 */
function shallowWithIntl(node) {
    initContext();
    return (0, _enzyme.shallow)(nodeWithIntlProp(node), { context: { intl: intl } });
}

/**
 * Equivalent to enzyme's 'mount' method.
 * @param {string} node React Component that requires react-intl.
 * @return {object}
 */
function mountWithIntl(node) {
    initContext();
    return (0, _enzyme.mount)(nodeWithIntlProp(node), {
        context: { intl: intl },
        childContextTypes: { intl: _reactIntl.intlShape }
    });
}

function initContext() {
    var intlProvider = new _reactIntl.IntlProvider({ locale: locale, messages: messages }, {});
    var intlContext = intlProvider.getChildContext();
    intl = { intlContext: intlContext };
}

/**
 * Helper that passes intl object to the wrapped React Component.
 * @param {object} node React Component that requires react-intl.
 * @return {object}
 */
function nodeWithIntlProp(node) {
    return _react2.default.cloneElement(node, { intl: intl });
}

var enzymeReactIntl = {
    loadTranslation: loadTranslation,
    shallowWithIntl: shallowWithIntl,
    mountWithIntl: mountWithIntl
};
module.exports = enzymeReactIntl;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("enzyme");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("jsonfile");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

var expect = __webpack_require__(1).expect;

//import jsonfile from 'jsonfile';
//var testLanguageFile = './testLanguageFile.json';
//var testLanguageFileMessages = jsonfile.readFileSync(testLanguageFile);
var testLanguageFileMessages = {
    "first_msg": "Message 1",
    "second_msg": "Message 1"
};

describe('enzymeReactIntl', function () {
    it('messages should be loaded from the language file', function () {
        var messages = (0, _index.loadTranslation)('/test/testLanguageFile.json');
        expect(messages).to.deep.equal(testLanguageFileMessages);
    });
});

/***/ })
/******/ ]);
//# sourceMappingURL=test.js.map