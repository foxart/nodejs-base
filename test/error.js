'use strict';
require('../console-color');
console.clear();
const FaError = require('../error');
// const FaErrorTrace = require('../src/FaErrorTrace');
// const FaBeautifierConsole = require('../beautifier-color');
// const FaBeautifierColor = new FaBeautifier(FaBeautifierWrapperColor);
// const WrapperPlain = require('fa-beautifier/src/wrapper/wrapper-plain');
// const FaBeautifierPlain = new FaBeautifier(WrapperPlain);
// const WrapperJson = require('fa-beautifier/src/wrapper/wrapper-json');
// const FaBeautifierJson = new FaBeautifier(WrapperJson);
// const WrapperHtml = require('fa-beautifier/src/wrapper/wrapper-html');
// const FaBeautifierHtml = new FaBeautifier(WrapperHtml);
// new FaConsole(FaBeautifierConsole);
console.clear();
const err = new FaError('my custom error');
(function() {
	console.log(err);
})();
function namedFunction() {
	console.log(err.get(0));
}

const variableFunction = function() {
	console.log(err.cut(0));
};
namedFunction();
variableFunction();
console.log(err);
