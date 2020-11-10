'use strict';
const DateAndTime = require('date-and-time');
const bx = require('./unicode/Box');
const FaError = require('./FaError');

class FaConsole {
	/**
	 * @param {FaBeautifier} Beautifier
	 */
	constructor(Beautifier) {
		/**
		 * @type {FaBeautifier}
		 */
		this.beautifier = Beautifier;
		/**
		 * @type {Wrapper}
		 */
		this.wrapper = Beautifier.wrapper;
		const log = console.log;
		console.clear = () => {
			process.stdout.write('\x1Bc');
		};
		console.log = (...args) => {
			const trace = new FaError('').get(1);
			trace.path = trace.path ? trace.path.replace(process.cwd(), '') : trace.path;
			const data = args.length === 1 ? [args[0]] : args;
			const result = [];
			for (let i = 0; i <= data.length - 1; i++) {
				result.push(this.beautifier.beautify(data[i]));
			}
			log(this.beautifier.wrapper.log(this._date(), this.wrapper.logTrace(trace), `\n${result.join(' ')}`));
		};
		console.message = (...args) => {
			const data = args.length === 1 ? [args[0]] : args;
			const trace = new FaError('').get(1);
			trace.path = trace.path ? trace.path.replace(process.cwd(), '') : trace.path;
			const result = [];
			const align = this._align(data);
			result.push(this._header(align));
			// result.push(this._spacer(align));
			for (let i = 0; i < data.length; i++) {
				result.push(`${this._body(String(data[i]), align)}`);
			}
			result.push(`${this._footer(align)}`);
			log(this.wrapper.log(this._date(), this.wrapper.logTrace(trace), `\n${result.join('\n')}`));
		};
		console.error = (error) => {
			log(error);
			// const exception = 'exception';
			// const type = 'type';
			// const trace = new FaError('').get(1);
			// trace.path = trace.path ? trace.path.replace(process.cwd(), '') : trace.path;
			// const result = [];
			// const align = this._align([exception, type]);
			// result.push(this._header(align));
			// result.push(`${this._body(String(type), align)}`);
			// result.push(this._spacer(align));
			// result.push(`${this._body(String(exception), align)}`);
			// result.push(`${this._footer(align)}`);
			// log(this.wrapper.log(this._date(), this.wrapper.logTrace(trace), `\n${result.join('\n')}`));
		};
		// process.on('unhandledRejection', (rejection) => {
		// 	console.error(rejection);
		// });
		// process.on('uncaughtException', (exception) => {
		// 	console.error(exception);
		// });
	}

	/**
	 * @param {Array} list
	 * @returns {number}
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
	 * @returns {string}
	 * @private
	 */
	_header(align) {
		return `${bx.topLeft}${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}${bx.topRight}`;
	}

	/**
	 * @param {number} align
	 * @returns {string}
	 * @private
	 */
	_footer(align) {
		return `${bx.bottomLeft}${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}${bx.bottomRight}`;
	}

	/**
	 * @param {number} align
	 * @returns {string}
	 * @private
	 */
	_spacer(align) {
		return `${bx.verticalLeft}${bx.horizontal}${Array(align + 1).join(bx.horizontal)}${bx.horizontal}${bx.verticalRight}`;
	}

	/**
	 * @param {string} data
	 * @param {number} align
	 * @returns {string}
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
