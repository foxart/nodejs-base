'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperPlain = require('./src/wrapper/Plain');
module.exports = new FaBeautifier(WrapperPlain);
