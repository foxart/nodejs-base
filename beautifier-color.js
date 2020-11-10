'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const FaWrapper = require('./src/wrapper/WrapperColor');
module.exports = new FaBeautifier(FaWrapper);
