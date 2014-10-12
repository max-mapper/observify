var array = require('observ-array')
var struct = require('observ-struct')
var value = require('observ')

module.exports = function(obj) {
  var result
  if (isArray(obj)) result = createArray(obj)
  else if (isObject(obj)) result = createObject(obj)
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

function createObject(obj) {
  var data = {}
  Object.keys(obj).forEach(function(key) {
    var val = obj[key]
    if (isArray(val)) return data[key] = createArray(val)
    if (isObject(val)) return data[key] = createObject(val)
    return data[key] = value(val)
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
