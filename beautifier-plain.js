'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const FaWrapper = require('./src/wrapper/Plain');
module.exports = new FaBeautifier(FaWrapper);
