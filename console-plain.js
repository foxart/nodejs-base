'use strict';
const FaConsole = require('./src/FaConsole');
const FaBeautifier = require('./src/FaBeautifier');
const FaWrapper = require('./src/wrapper/Plain');
const Beautifier = new FaBeautifier(FaWrapper);
module.exports = new FaConsole(Beautifier);
