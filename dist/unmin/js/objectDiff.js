!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.objectDiff=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function () {
  "use strict";
  var getFirstExtraKeys = function (first, second) {
    var i;
    var curExtra;
    var childExtra;
    for (i in first) {
      if (first.hasOwnProperty(i)) {
        if (first[i] !== null && typeof first[i] === "object") {
          /*
          object includes arrays and objects, null is not
          considered an object, so we make sure its not null
          */
          childExtra = getFirstExtraKeys(first[i], (second || {})[i]);
          if (childExtra !== undefined) {
            curExtra = curExtra || {};
            curExtra[i] = childExtra;
          }
        } else {
          if(second === undefined || second === null || second[i] !== first[i]){
              curExtra = curExtra || {};
              curExtra[i] = first[i];
          }
        }
      }
    }
    return curExtra;
  };
  module.exports =function(first, second){
    var res = getFirstExtraKeys({itm: first}, {itm: second});
    return (res || {}).itm;
  };
}());

},{}]},{},[1])
(1)
});