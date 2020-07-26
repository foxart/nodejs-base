'use strict';
require('../console-color');
const FaError = require('../error');
// const FaBeautifier = require('../beautifier-console');
// const FaBeautifier = require('../beautifier-json');
// const FaBeautifier = require('../beautifier-plain');
// const FaBeautifier = require('../beautifier-html');

// new FaConsole(FaBeautifier);
console.clear();

function test() {
	console.log('');
	console.log(1, '');
	console.log(2, { a: '' });
	console.log(3, err);
}

// console.log = Console.log;
// console.clear = Console.clear;
const err = new FaError('my custom error');
// console.log('XXX');
// test();
// console.message(1, 'x', null, undefined);
// console.log(err.get(1), 2, 3);
//
console.log('user', [2, 3]);
console.log([1, 2, 3], undefined);
const data = { a: 1, b: 3.14, str: 'string' };
console.log(JSON.stringify(data));


