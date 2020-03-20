'use strict';
const myWeakMap = new WeakMap();
const keyArr = [];
const keyObj = {};
const keyFunc = function() {
};
myWeakMap.set(keyArr, '{}');
myWeakMap.set(keyObj, 'function');
myWeakMap.set(keyFunc, 'myObj');
module.exports = myWeakMap;
