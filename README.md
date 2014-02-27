Object diff.js
===

Usage
---
this objectDiff will get the extra and different properties of the
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


  if two objects are are the same
  it objectDiff yields undefined
ex:
```js
  objectDiff({}, {}) === undefined //true
```

more examples
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

make sure you run tests with data that resembles your application

if you just want to use it, check src for nodejs
or dist for browsers

creating build from scratch requires nodejs and grunt
the build is already in this repo under dist

Install nodejs from its site
>http://nodejs.org/

once nodejs is installed install grunt globally
```sh
sudo npm install -g grunt-cli
```

Building
---
go to the root of this project (the one conaining package.json) and install the building dependencies:
```sh
npm install
```
run grunt to build the project
```sh
grunt
```
