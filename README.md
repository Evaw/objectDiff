# objectDiff [![Build Status](https://travis-ci.org/Evaw/objectDiff.svg?branch=master)](https://travis-ci.org/Evaw/objectDiff)

Usage
---
objectDiff will get the extra and different properties of the
first object

ex.
```js
objectDiff(
  {
    steel: {
      sword: {
        weight: 20
      }
    }
  },
  {
    steel: {
      train: {
        contains: "coal"
      }
    }
  });
```
yields
```js
  {
    steel: {
      sword: {
        weight: 20
      }
    }
  }
```
  because all the stuff in a is not in b (this diff shows extra or different, only for the first object).
  You can get the same for the second object by reversing the order
  in your call


  if two objects are are the same,
  objectDiff yields undefined

ex.
```js
  objectDiff({}, {}) === undefined //true
```

more examples.
```js
  objectDiff(
  {
    steel: {
      sword:{
        weight: 10
      },
      train: {
        hasCoal: true
      }
    }
  },
  {
    steel: {
      sword: {
        weight: 10
      }
    }
  });

```
yields
```js
{
  steel: {
    train: {
      hasCoal: true
    }
  }
}
```
because the first object is only different in the path steel.train.hasCoal


Warning
---
make sure you run tests with data that resembles your application


There are things that may not be implemented.
Circular structures come to mind as they have not been tested.

distribution
---
the distribution file is under dist,
you can pick minified or not minified


Building
---

creating build from scratch requires nodejs and grunt.
Note that, the build is already in this repo under dist.


Install nodejs from its site
>http://nodejs.org/

once nodejs is installed install grunt globally
```sh
sudo npm install -g grunt-cli
```
go to the root of this project (the one conaining package.json) and install the building dependencies:
```sh
npm install
```
run grunt to build the project
```sh
grunt
```


test

```sh
mocha
```