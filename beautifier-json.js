'use strict';
const FaWrapper = require('./src/wrapper/WrapperJson');
const FaBeautifier = require('./src/FaBeautifier');
module.exports = new FaBeautifier(FaWrapper);
