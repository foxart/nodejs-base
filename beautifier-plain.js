'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperPlain = require('./src/wrapper/WrapperPlain');
module.exports = new FaBeautifier(WrapperPlain);
