/* global it:false */
"use strict";
var assert = require("assert");
var objectDiff = require("..");
var deepEqual = assert.deepEqual;
var ok = assert.ok;

it("first has extra stuff", function () {
  var a = {
      a: "hello"
    },
    b = {};
  deepEqual(objectDiff(a, b), a, "found first has extra key with a string");
  a = {
    a: "hello",
    A: 1,
  };
  b = {};
  deepEqual(objectDiff(a, b), a, "found first has extra keys with a nuber and a string");
  a = {
    a: {
      s: "t"
    }
  };
  b = {
    a: {

    }
  };
  deepEqual(objectDiff(a, b), a, "first object has a child with extra stuff");
  a = {
    steel: {
      sword: "aaa",
      train: "bbb"
    }
  };
  b = {
    steel: {
      sword: "aaa",
      train: "rrr"
    }
  };
  deepEqual(objectDiff(a, b), {
    steel: {
      train: "bbb"
    }
  }, "only part of a child is extra");

  a = {
    steel: {
      sword: {
        weight: 20
      }
    }
  };
  b = {};
  deepEqual(objectDiff(a, b), a, "second obj has nothing, first has lots");
  a = {
    a: "L"
  };
  b = null;
  deepEqual(objectDiff(a, b), a, "first has something, second is null");

  a = null;
  b = {
    a: "a"
  };
  deepEqual(objectDiff(a, b), a, "first is just null");



});
it("completely different", function () {
  var a,b;
  a = {
    steel: {
      sword: {
        weight: 20
      }
    }
  };
  b = {
    steel: {
      train: {
        contains: "coal"
      }
    }
  };
  deepEqual(objectDiff(a, b), a, "is completely different from b ,even though they both have the same children");

});
it("eq obj", function () {
  var check = function (obj) {
    ok(objectDiff(obj, obj) === undefined);
  };
  check(null);
  check({});
  check({
    A: "a"
  });
  check({
    A: {
      a: "a"
    }
  });
  check({

  });
});
it("arrays", function () {
  var a = [1,2,3];
  var b = [1];
  var ans = [];
  ans[1] = 2;
  ans[2] = 3;
  deepEqual(objectDiff(a,b), ans);
});
it("array object mix", function(){
  var a = {
    "arr": [1,2,3],
    "k": "l"
  };
  var b;
  var ans = a;
  deepEqual(objectDiff(a,b), ans);
  ans = undefined;
  deepEqual(objectDiff(b,a), ans);


  a = {
    arr: [{o:"p"}]
  };
  b = undefined;
  ans = a;
  deepEqual(objectDiff(a, b), ans);

  //a = a;
  b = {
    arr:[]
  };
  ans = a;
  deepEqual(objectDiff(a,b), ans);

  a = {
    arr: [{o: "p"}]
  };
  b = {
    arr: [{o: "p"}]
  };
  ans = undefined;
  deepEqual(objectDiff(a,b),ans);

  a = {
    arr: [{o: "p"}],
    arr2: [{r: "a"}]
  };
  b = {
    arr: [{o: "p"}]
  };
  ans = {
    arr2: [{r: "a"}]
  };
  deepEqual(objectDiff(a,b), ans);
});
