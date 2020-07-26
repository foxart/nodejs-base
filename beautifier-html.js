'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const FaWrapper = require('./src/wrapper/Html');
module.exports = new FaBeautifier(FaWrapper);
