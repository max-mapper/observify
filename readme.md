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

## blacklisted properties

`observ-struct` has a [blacklist](https://github.com/Raynos/observ-struct/blob/master/index.js) of property names that cannot be used as keys (as they clash with javascript reserved words).

You can pass an options object with a `autoRename` property to tell observify to rename these properties.

```js
var observify = require('observify')
var data = observify({
  "name":"I'm bad, I'm bad, you know it",
  "comment":"I am OK"
}, {
  autoRename:'$'
})

console.log(data())
```

This would print:

```js
{
  $name:"I'm bad, I'm bad, you know it",
  comment:"I am OK"
}
```

If `autoRename` is true it will default to `$`.

## custom object contstructor

By default `observify` will use `observ-struct`, but if you want to use a different constructor for objects like [observ-varhash](https://github.com/nrw/observ-varhash) you can pass it in as an object:

```js
var data = observify({
  originalKey: 1
}, {
  objectConstructor: require('observ-varhash')
})

// add a key!
data.put('newKey', 2)

// remove a key!
data.delete('newKey')
```
