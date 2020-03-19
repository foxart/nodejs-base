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
	 * @param {FaBeautifier} Beautifier
	 */
	constructor(Beautifier) {
		this.beautifier = Beautifier;
		const log = console.log;
		console.clear = () => {
			process.stdout.write('\x1Bc');
		};
		console.log = (...args) => {
			const trace = new FaError('').get(1);
			trace.path = trace.path ? trace.path.replace(process.cwd(), '') : trace.path;
			const data = args.length === 1 ? [args[0]] : args;
			for (let i = 0; i <= data.length - 1; i++) {
				log(this.log(this._date(), this.logTrace(trace), this.beautifier.beautify(data[i])));
			}
		};
		console.message = (...args) => {
			const data = args.length === 1 ? [args[0]] : args;
			const trace = new FaError('').get(1);
			trace.path = trace.path ? trace.path.replace(process.cwd(), '') : trace.path;
			log(data);
			const result = [];
			const align = this._align(data);
			result.push(this._header(align));
			for (let i = 0; i < data.length; i++) {
				result.push(`${this._body(String(data[i]), align)}`);
			}
			result.push(`${this._footer(align)}`);
			log('\n' + result.join('\n'));
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

	/**
	 * @param {Array} list
	 * @return {number}
	 * @private
	 */
	_align(list) {
		let result = 0;
		for (let keys = Object.keys(list), i = 0, end = keys.length - 1; i <= end; i++) {
			if (result < String(list[keys[i]]).length) {
				result = String(list[keys[i]]).length;
			}
		}
		return result;
	}

	/**
	 * @returns {string}
	 * @private
	 */
	_date() {
		return DateAndTime.format(new Date(new Date().setUTCHours(new Date().getUTCHours() + 2)), 'H:mm:ss');
	}

	/**
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_header(align) {
		return `${bx.topLeft}${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}${bx.topRight}`;
	}

	/**
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_footer(align) {
		return `${bx.bottomLeft}${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}${bx.bottomRight}`;
	}

	/**
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_spacer(align) {
		return `\u251c${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}\u2524`;
	}

	/**
	 * @param {string} data
	 * @param {number} align
	 * @return {string}
	 * @private
	 */
	_body(data, align) {
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
