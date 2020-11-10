'use strict';
const myMap = new Map();
const keyStr = 'test';
const keyObj = {};
const keyFunc = function() {
};
myMap.set(keyStr, 'value associated with string');
myMap.set(keyObj, 'value associated with object');
myMap.set(keyFunc, 'value associated with function');
module.exports = myMap;
