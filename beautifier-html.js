'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const FaWrapper = require('./src/wrapper/WrapperHtml');
module.exports = new FaBeautifier(FaWrapper);
