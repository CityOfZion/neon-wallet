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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var navArr = [{
  title: 'DOWNLOADS',
  id: 'downloads-nav-link',
  href: '#downloads',
  sectionId: 'section#downloads-section'
}, {
  title: 'SUPPORT',
  id: 'support-nav-link',
  href: '#support',
  sectionId: 'section#support-section'
}, {
  title: 'DONATIONS',
  id: 'donations-nav-link',
  href: '#donations',
  sectionId: 'section#donations-section'
}];

$(document).ready(function () {
  var _this = this;

  var pathHash = window.location.hash;
  var currentSection = navArr.find(function (navItem) {
    return navItem.href === pathHash;
  });
  if (currentSection) {
    currentSection.active = true;
    var navArrWithActiveFlag = navArr.map(function (navItem) {
      if (navItem.title === currentSection.title) {
        navItem = currentSection; // eslint-disable-line
      }
      return navItem;
    });
    navArr = navArrWithActiveFlag;
  }
  $('nav').append(navigation(navArr));
  var sections = $('section');
  var nav = $('nav');
  var navHeight = nav.outerHeight();
  bindScrollHandlersToNavElements(navArr);
  $(window).scroll(_.debounce(function () {
    return handleScroll.call(_this, sections, nav, navHeight);
  }, 150));
  return currentSection ? $(currentSection.sectionId)[0].scrollIntoView({ behavior: 'instant' }) : undefined;
});

function handleScroll(sections, nav, navHeight) {
  var currPos = $(this).scrollTop();
  sections.each(function () {
    var top = $(this).offset().top - navHeight;
    var bottom = top + $(this).outerHeight();
    if (currPos >= top && currPos <= bottom) {
      nav.find('a').removeClass('active-nav-link');
      sections.removeClass('active-nav-link');
      $(this).addClass('active-nav-link');
      var href = $(this).attr('id').split('-').splice(0, 1).join('');
      nav.find('a[href="#' + href + '"]').addClass('active-nav-link');
    }
  });
}

function bindScrollHandlersToNavElements(nav) {
  nav.forEach(function (e) {
    return $('#' + e.id).click(function () {
      $('#nav-items-container a').each(function (index, value) {
        $(value).removeClass('active-nav-link');
      });
      $('#' + e.id).addClass('active-nav-link');
      return $(e.sectionId)[0].scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function navigation(_navArr) {
  var navIterator = function navIterator() {
    return _navArr.map(function (navItem) {
      return '<a id=' + navItem.id + ' href=' + navItem.href + ' class=' + (navItem.active ? 'active-nav-link' : '') + '>' + navItem.title + '</a>';
    }).join('');
  };
  return '<div id="nav-items-container">' + navIterator() + '</div>';
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);