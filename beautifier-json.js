'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperJson = require('./src/wrapper/WrapperJson');
module.exports = new FaBeautifier(WrapperJson);
