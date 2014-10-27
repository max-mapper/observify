var array = require('observ-array')
var struct = require('observ-struct')
var value = require('observ')

// we could get this exposed from observ-struct
var blackList = {
  "length": true,
  "name": true,
  "_diff": true,
  "_type": true,
  "_version": true
}

module.exports = function(obj, opts) {
  var result
  if (isArray(obj)) result = createArray(obj)
  else if (isObject(obj)) result = createObject(obj, opts)
  else result = value(obj)
  return result
}

function createArray(obj) {
  return array(obj.map(function(el) {
    if (isArray(el)) return createArray(el)
    if (isObject(el)) return createObject(el)
    return value(el)
  }))
}

function createObject(obj, opts) {
  opts = opts || {}
  var autoRename = opts.autoRename
  if(autoRename && typeof(autoRename)=='boolean') autoRename = '$'
  var data = {}
  Object.keys(obj).forEach(function(key) {
    var val = obj[key]
    var writeKey = blackList[key] && autoRename ? autoRename + key : key
    if (isArray(val)) return data[writeKey] = createArray(val)
    if (isObject(val)) return data[writeKey] = createObject(val, opts)
    return data[writeKey] = value(val)
  })
  return struct(data)
}

function isArray(obj) {
  return Array.isArray(obj)
}

// remember, typeof [] will return 'object' so check isArray first before using this method
function isObject(obj) {
  if (typeof obj === 'object' && obj !== null) return true
  else return false
}
