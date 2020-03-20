'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperJson = require('./src/wrapper/Json');
module.exports = new FaBeautifier(WrapperJson);
