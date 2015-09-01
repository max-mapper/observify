var test = require('tape')
var observify = require('./')

test('simple number value', function(t) {
  var data = 1
  var o = observify(data)
  t.equal(o(), 1)
  t.end()
})

test('simple array of numbers', function(t) {
  var data = [1, 2, 3]
  var o = observify(data)
  t.equal(o.get(0)(), 1)
  t.equal(o.get(1)(), 2)
  t.equal(o.get(2)(), 3)
  t.end()
})

test('simple object with number values', function(t) {
  var data = {
    "a": 1,
    "b": 2,
    "c": 3
  }
  var o = observify(data)
  t.equal(o.a(), 1)
  t.equal(o.b(), 2)
  t.equal(o.c(), 3)
  t.end()
})

test('simple object with null', function(t) {
  var o = observify({
    a: null
  })

  t.equal(o.a(), null)
  t.end()
})

test('complex nested object', function(t) {
  var data = {
    "_rev": "467-3c760832d52731ea8f34f18ef0a01207",
    "$name": "request",
    "description": "Simplified HTTP request client.",
    "dist-tags": {
      "latest": "2.45.0"
    },
    "versions": {
      "0.10.0": {
        "$name": "request",
        "description": "Simplified HTTP request method.",
        "tags": [
          "http",
          "simple",
          "util",
          "utility"
        ],
        "version": "0.10.0",
        "author": {
          "$name": "Mikeal Rogers",
          "email": "mikeal.rogers@gmail.com"
        },
        "directories": {
          "lib": "lib"
        },
        "repository": {
          "type": "git",
          "url": "http://github.com/mikeal/node-utils.git"
        },
        "bugs": {
          "web": "http://github.com/mikeal/node-utils/issues"
        },
        "engines": [
          "node >=0.1.90"
        ],
        "main": "./lib/main",
        "_id": "request@0.10.0",
        "_nodeSupported": true,
        "_npmVersion": "0.2.7-2",
        "_nodeVersion": "v0.3.1-pre",
        "dist": {
          "tarball": "http://registry.npmjs.org/request/-/request-0.10.0.tgz",
          "shasum": "0910540d9b86c4f90b4c4b44c84025220a1f9d2e"
        }
      }
    }
  }
  var o = observify(data)
  t.equal(o.versions['0.10.0'].tags.get(0)(), 'http')
  t.end()
})

test('rename blacklisted names', function(t){
  var data = {
    "name":"I'm bad, I'm bad, you know it",
    "comment":"I am OK",
    "_version":{
      "length":3.14,
      "_diff":"Not likely key"
    }
  }
  var o = observify(data, {
    autoRename:true
  })
  t.equal(o.$name(), "I'm bad, I'm bad, you know it")
  t.equal(o.comment(), 'I am OK')
  t.equal(o.$_version.$length(), 3.14)

  var customData = {
    "name":"daffy"
  }

  var o2 = observify(customData, {
    autoRename:'duck'
  })

  t.equal(o2.duckname(), 'daffy')

  var arrData = [
    {"name":"batman"}
  ]

  var o3 = observify(arrData, {
    autoRename:true
  })

  t.equal(o3.get(0).$name(), 'batman')


  var nameInsideArray = {
    "arr": [ { "name": "robin" } ]
  }

  var o4 = observify(nameInsideArray, {
    autoRename:true
  })

  t.equal(o4.arr.get(0).$name(), 'robin')

  t.end()
})

test('use varhash instead of struct', function(t) {
  var o = observify({
    a: 1
  }, {
    objectConstructor: require('observ-varhash')
  })

  t.equal(o.a(), 1)

  o.put('b', 2)
  t.equal(o.a(), 1)

  t.end()
})
