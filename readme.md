# observify

Converts JS objects into their [observable](https://github.com/raynos/mercury#observ) equivalents using [observ](https://github.com/Raynos/observ), [observ-array](https://github.com/Raynos/observ-array) and [observ-struct](https://github.com/Raynos/observ-struct). Designed for use with [mercury](https://github.com/raynos/mercury)

[![NPM](https://nodei.co/npm/observify.png?global=true)](https://nodei.co/npm/observify/)

[![Travis](http://img.shields.io/travis/maxogden/observify.svg?style=flat)](https://travis-ci.org/maxogden/observify)

## installation

```
npm install observify
```

## usage

```js
var observify = require('observify')
var data = observify({
  "foo": "bar",
  "cats": ["taco", "burrito"],
  "age": 82
})
```

is equivalent to doing:

```js
var array = require('observ-array')
var struct = require('observ-struct')
var value = require('observ')

var data = struct({
  "foo": value("bar"),
  "cats": array([value("taco"), value("burrito")]),
  "age": value(82)
})
```
