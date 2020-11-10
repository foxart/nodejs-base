'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const FaWrapper = require('./src/wrapper/WrapperPlain');
module.exports = new FaBeautifier(FaWrapper);
