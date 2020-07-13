'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperConsole = require('./src/wrapper/Color');
const Beautifier = new FaBeautifier(WrapperConsole);
const FaConsole = require('./src/FaConsole');
module.exports = new FaConsole(Beautifier);
