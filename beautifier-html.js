'use strict';
const FaBeautifier = require('./src/FaBeautifier');
const WrapperHtml = require('./src/wrapper/Html');
module.exports = new FaBeautifier(WrapperHtml);
