/*global test:false, ok:false, deepEqual:false, objectDiff:false*/
"use strict";
test('first has extra stuff', function () {
  var a = {
    a: "hello"
  },
    b = {};
  deepEqual(objectDiff(a, b), a, "found first has extra key with a string");
  a = {
    a: "hello",
    A: 1
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
  deepEqual(objectDiff(a, b), a, 'first object has a child with extra stuff');
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
  }, 'only part of a child is extra');

  a = {
    steel: {
      sword: {
        weight: 20
      }
    }
  };
  b = {};
  deepEqual(objectDiff(a, b), a, 'second obj has nothing, first has lots');
  a = {
    a: "L"
  };
  b = null;
  deepEqual(objectDiff(a, b), a, 'first has something, second is null');

  a = null;
  b = {
    a: "a"
  };
  deepEqual(objectDiff(a, b), a, "first is just null");



});
test('completely different', function () {
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
test('eq obj', function () {
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