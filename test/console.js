'use strict';
process.stdout.write('\x1Bc');
const FaError = require('../error');
const FaBeautifier = require('fa-beautifier');
const FaBeautifierWrapperColor = require('fa-beautifier/wrapper-console');
const FaBeautifierColor = new FaBeautifier(FaBeautifierWrapperColor);
// const WrapperPlain = require('fa-beautifier/src/wrapper/wrapper-plain');
// const FaBeautifierPlain = new FaBeautifier(WrapperPlain);
// const WrapperJson = require('fa-beautifier/src/wrapper/wrapper-json');
// const FaBeautifierJson = new FaBeautifier(WrapperJson);
// const WrapperHtml = require('fa-beautifier/src/wrapper/wrapper-html');
// const FaBeautifierHtml = new FaBeautifier(WrapperHtml);
const Console = require('../src/fa-console');
const con = new Console(FaBeautifierColor);
const err = new FaError('hui');

function test() {
	console.log('');
	console.log(1, '');
	console.log(2, {a: ''});
	console.log(3, err);
}
test();
// console.log(err.get(1), 2, 3);
//
// console.log([1, 2, 3], undefined);
// const test = {a: 1, b: 3.14, str: 'string'};
// console.log(test);


