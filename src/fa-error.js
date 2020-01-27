'use strict';

/**
 * @constructor
 */
class FaError extends Error {
	/**
	 * @param {*} error
	 */
	constructor(error) {
		super();
		// this.name = this.constructor.name;
		// this.message = error;
		// if (typeof Error.captureStackTrace === 'function') {
		// 	Error.captureStackTrace(this, this.constructor);
		// } else {
		// 	this.stack = (new Error(error)).stack;
		// }
		this.name = error.name ? error.name : this.constructor.name;
		this.message = error.message ? error.message : error;
		// this.stack = error.stack ? error.stack : (new Error().stack);
		// this.trace = FaParser.stack(this.stack);
		if (error.stack) {
			this.stack = error.stack;
			this.trace = FaError.stack(this.stack);
		} else {
			const stack = FaError.stack(new Error().stack);
			stack.shift();
			this.trace = stack;
		}
	}

	/**
	 * @param {string} data
	 * @return {Array}
	 */
	static stack(data) {
		const list = data.split('\n').filter((item) => item);
		list.splice(0, 1);
		const Expression1 = new RegExp('^\\s+at\\s(.+)\\s\\((.+):(\\d+):(\\d+)\\)$');
		const Expression2 = new RegExp('^\\s+at\\s(.+):(\\d+):(\\d+)$');
		const Expression3 = new RegExp('^\\s+at\\s(.+)$');
		return list.map((item) => {
			const Match1 = Expression1.exec(item);
			const Match2 = Expression2.exec(item);
			const Match3 = Expression3.exec(item);
			if (Match1) {
				return {
					method: Match1[1],
					path: Match1[2],
					line: Match1[3],
					column: Match1[4],
				};
			} else if (Match2) {
				return {
					method: null,
					path: Match2[1],
					line: Match2[2],
					column: Match2[3],
				};
			} else if (Match3) {
				return {
					method: Match3[1],
					path: null,
					line: null,
					column: null,
				};
			} else {
				return {
					method: item,
					path: null,
					line: null,
					column: null,
				};
			}
		});
	}

	/**
	 * @param {string} trace
	 * @return {FaError}
	 */
	append(trace) {
		this.trace.push(trace);
		return this;
	}

	/**
	 * @param {string} trace
	 * @return {FaError}
	 */
	prepend(trace) {
		this.trace.unshift(trace);
		return this;
	}

	/**
	 * @param {string} trace
	 * @return {FaError}
	 */
	set(trace) {
		if (trace) {
			this.trace = Array.isArray(trace) ? trace : [trace];
		}
		return this;
	}

	/**
	 *
	 * @param {number|undefined} level
	 * @return {FaError}
	 */
	pick(level = undefined) {
		this.trace = level ? this.trace : [this.trace[level]];
		return this;
	}
}

// Error = FaError;
/**
 * @class {FaError}
 */
module.exports = FaError;
