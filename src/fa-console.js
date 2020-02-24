'use strict';
/** @type {Class} */
const DateAndTime = require('date-and-time');
const ef = require('fa-beautifier/console-effect');
const cl = require('fa-beautifier/console-color');
const bx = require('fa-beautifier/console-box');
const FaError = require('./fa-error');

/**
 * @constructor
 */
class FaConsole {
	/**
	 * @param {FaBeautifier} beautifier
	 */
	constructor(beautifier) {
		this.beautifier = beautifier;
		const log = console.log;
		console.clear = () => {
			process.stdout.write('\x1Bc');
		};
		console.log = (...args) => {
			const date = DateAndTime.format(new Date(new Date().setUTCHours(new Date().getUTCHours() + 2)), 'H:mm:ss');
			const trace = new FaError('').get(1);
			trace.path = trace.path ? trace.path.replace(process.cwd(), '') : trace.path;
			const data = args.length === 1 ? [args[0]] : args;
			for (let i = 0; i <= data.length - 1; i++) {
				log(this.log(date, this.logTrace(trace), this.beautifier.beautify(data[i])));
			}
		};
		console.message = (...args) => {
			const date = DateAndTime.format(new Date(new Date().setUTCHours(new Date().getUTCHours() + 2)), 'H:mm:ss');
			const data = args.length === 1 ? [args[0]] : args;
			const trace = new FaError('').get(1);
			trace.path = trace.path ? trace.path.replace(process.cwd(), '') : trace.path;
			// message = typeof message === 'string' ? message.split('\n') : [message.toString()];
			log(data);
			const result = [];
			const align = this._getAlign(data);
			result.push(this._messageHeader(align));
			for (let i = 0; i < data.length; i++) {
				// log('align', align, data);
				// for (let keys = Object.keys(message), i = 0, end = keys.length - 1; i <= end; i++) {
				result.push(`${this._messageBody(String(data[i]), align)}`);
				// }
			}
			result.push(`${this._messageFooter(align)}`);
			log('\n' + result.join('\n'));
			// const result = [];
			// const align = this._getAlign(message);
			// log('align', align);
			// result.push(this._messageHeader(align));
			// for (let keys = Object.keys(message), i = 0, end = keys.length - 1; i <= end; i++) {
			// 	result.push(`${this._messageBody(message[keys[i]], align)}`);
			// }
			// result.push(`${this._messageFooter(align)}`);
			// log('\n' + result.join('\n'));
		};
	}

	/**
	 * @param {string} date
	 * @param {string} trace
	 * @param {string} data
	 * @return {string}
	 */
	log(date, trace, data) {
		return `${ef.reset}${cl.white}[${cl.yellow}${date}${cl.white}] ${trace} ${ef.bold}${cl.black}| ${data}`;
	}

	/**
	 * @param {FaErrorTrace} data
	 * @return {string}
	 */
	logTrace(data) {
		return [
			`${ef.reset}${ef.bold}${data.method}`,
			`${ef.reset}${ef.bold}${cl.black}${data.path}`,
			`${ef.reset}${cl.yellow}${data.line}${ef.bold}${cl.black}:${ef.reset}${data.column}`,
		].join(' ');
	}

	/**/
	/**
	 * @param {Array} list
	 * @return {number}
	 * @private
	 */
	_getAlign(list) {
		let result = 0;
		for (let keys = Object.keys(list), i = 0, end = keys.length - 1; i <= end; i++) {
			if (result < String(list[keys[i]]).length) {
				result = String(list[keys[i]]).length;
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
		return `${bx.topLeft}${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}${bx.topRight}`;
	}

	/**
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_messageFooter(align) {
		return `${bx.bottomLeft}${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}${bx.bottomRight}`;
	}

	/**
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_messageSpacer(align) {
		return `\u251c${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}\u2524`;
	}

	/**
	 * @param {string} data
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_messageBody(data, align) {
		const spacer = ' ';
		const length = align - data.length + 1;
		if (length < 0) {
			return `${bx.vertical}${spacer}${data.substring(0, align)}${spacer}${bx.vertical}`;
		} else {
			return `${bx.vertical}${spacer}${data}${Array(length).join(spacer)}${spacer}${bx.vertical}`;
		}
	}
}

/**
 * @class {FaConsole}
 */
module.exports = FaConsole;
