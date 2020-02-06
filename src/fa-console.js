'use strict';
/**/
// const FaBeautifier = require('fa-beautifier');
const FaError = require('./fa-error');
/** @type {Object} */
// const DateAndTime = require('date-and-time');
/**
 * @type {*}
 */
const Console = {
	log: console.log,
	info: console.info,
	warn: console.warn,
	error: console.error,
};

/**
 * @constructor
 */
class FaConsole {
	/**
	 * @param {FaBeautifier} beautifier
	 */
	constructor(beautifier) {
		this.beautifier = beautifier;
		const self = this;
		const log = console.log;
		console.clear = () => {
			process.stdout.write('\x1Bc');
		};
		console.log = (...args) => {
			// const trace = new FaError('').get(1);
			// args = args.length === 1 ? [args[0]] : args;
			// for (let i = 0; i <= args.length - 1; i++) {
			// 	log(self.beautifier.log(trace), self.beautifier.beautify(args[i]));
			// }
			log(self.beautifier.log(args));
		};
		// console.message = function () {
		// 	let result = [];
		// 	let text = FaBeautify.plain(self._extractArguments(arguments));
		// 	let message = typeof text === "string" ? text.split("\n") : text.toString();
		// 	let align = self._getAlign(message);
		// 	result.push(self._messageHeader(align));
		// 	for (let keys = Object.keys(message), i = 0, end = keys.length - 1; i <= end; i++) {
		// 		result.push(`${self._messageBody(message[keys[i]], align)}`);
		// 	}
		// 	result.push(`${self._messageFooter(align)}`);
		// 	self._log("\n" + result.join("\n"), template.log);
		// };
	}

	/**
	 * @param {*} data
	 * @return {*}
	 * @private
	 */
	_arguments(data) {
		return data.length === 1 ? [data[0]] : data;
	}

	/**
	 * @param {Array} list
	 * @return {number}
	 * @private
	 */
	_getAlign(list) {
		let result = 0;
		for (let keys = Object.keys(list), i = 0, end = keys.length - 1; i <= end; i++) {
			if (result < list[keys[i]].length) {
				result = list[keys[i]].length;
			}
		}
		return result;
	}

	/**
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_messageHeader(align) {
		return `\u250c\u2500${Array(align + 1).join('\u2500')}\u2500\u2510`;
	}

	/**
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_messageFooter(align) {
		return `\u2514\u2500${Array(align + 1).join('\u2500')}\u2500\u2518`;
	}

	/**
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_messageSpacer(align) {
		return `\u251c\u2500${Array(align + 1).join('\u2500')}\u2500\u2524`;
	}

	/**
	 * @param {*} data
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_messageBody(data, align) {
		const wrapper = '\u2502';
		const spacer = ' ';
		if (data === undefined) {
			data = 'undefined';
		}
		const length = align - data.length + 1;
		if (length < 0) {
			return `${wrapper}${spacer}${data.toString().substring(0, align)}${spacer}${wrapper}`;
		} else {
			return `${wrapper}${spacer}${data.toString() + Array(length).join(spacer)}${spacer}${wrapper}`;
		}
	}
}

/**
 * @class {FaConsole}
 */
module.exports = FaConsole;
