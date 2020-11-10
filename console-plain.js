'use strict';
const BeautifierPlain = require('./beautifier-plain');
const FaConsole = require('./src/FaConsole');
module.exports = new FaConsole(BeautifierPlain);
