'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperColor = require('./src/wrapper/WrapperColor');
module.exports = new FaBeautifier(new WrapperColor());
