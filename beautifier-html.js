'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperHtml = require('./src/wrapper/WrapperHtml');
module.exports = new FaBeautifier(WrapperHtml);
