'use strict';
process.stdout.write('\x1Bc');
const WrapperColor = require('fa-beautifier/wrapper-console');
// const FaBeautifierColor = new FaBeautifier(WrapperColor);
// const WrapperPlain = require('fa-beautifier/src/wrapper/wrapper-plain');
// const FaBeautifierPlain = new FaBeautifier(WrapperPlain);
// const WrapperJson = require('fa-beautifier/src/wrapper/wrapper-json');
// const FaBeautifierJson = new FaBeautifier(WrapperJson);
// const WrapperHtml = require('fa-beautifier/src/wrapper/wrapper-html');
// const FaBeautifierHtml = new FaBeautifier(WrapperHtml);
const Console = require('../src/fa-console');
const con = new Console(WrapperColor);
const test = {a:1, b: 3.14, str: 'string'};
console.log(test);


