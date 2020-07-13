'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperConsole = require('./src/wrapper/Color');
module.exports = new FaBeautifier(WrapperConsole);
