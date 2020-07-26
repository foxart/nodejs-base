'use strict';
const FaWrapper = require('./src/wrapper/Json');
const FaBeautifier = require('./src/FaBeautifier');
module.exports = new FaBeautifier(FaWrapper);
