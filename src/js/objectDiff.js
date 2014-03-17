(function () {
  "use strict";
  var isArray = (function () {
    if(Array && Array.isArray)  {
      return Array.isArray;
    }
    return function (o) {
      return Object.prototype.toString.call(o) === '[object Array]';
    };
  }());
  var getEquivalentEmpty = function (objOrArr) {
    return isArray(objOrArr) ? [] : {};
  };
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
            //curExtra = curExtra || {};
            curExtra = curExtra || getEquivalentEmpty(first);
            curExtra[i] = childExtra;
          }
        } else {
          if(second === undefined || second === null || second[i] !== first[i]){
              //curExtra = curExtra || {};
              curExtra = curExtra || getEquivalentEmpty(first);
              curExtra[i] = first[i];
          }
        }
      }
    }
    return curExtra;
  };
  module.exports = function(first, second){
    var res = getFirstExtraKeys({itm: first}, {itm: second});
    return (res || {}).itm;
  };
}());
