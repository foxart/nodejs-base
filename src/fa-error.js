'use strict';

/**
 * @constructor
 */
class FaErrorTrace {
	/**
	 * @param {string|null} method
	 * @param {string|null} path
	 * @param {string|null} line
	 * @param {string|null} column
	 * @return {{path: *, method: *, line: *, column: *}}
	 */
	constructor(method = null, path = null, line = null, column = null) {
		return {
			method,
			path,
			line,
			column,
		};
	}
}

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
	 * @param {string|null} method
	 * @param {string|null} path
	 * @param {string|null} line
	 * @param {string|null} column
	 * @return {{path: *, method: *, line: *, column: *}}
	 */
	static trace1(method = null, path = null, line = null, column = null) {
		return Object.create({
			method,
			path,
			line,
			column,
		});
	}

	/**
	 * @param {string} data
	 * @return {FaErrorTrace[]}
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
				return new FaErrorTrace(Match1[1], Match1[2], Match1[3], Match1[4]);
			} else if (Match2) {
				return new FaErrorTrace(null, Match2[1], Match2[2], Match2[3]);
			} else if (Match3) {
				return new FaErrorTrace(Match3[1]);
			} else {
				return new FaErrorTrace(item);
			}
		});
	}

	/**
	 *
	 * @param {number} level
	 * @return {FaErrorTrace}
	 */
	get(level) {
		return this.trace[level];
	}

	/**
	 * @param {number} level
	 * @return {FaError}
	 */
	cut(level) {
		this.trace = [this.trace[level]];
		return this;
	}

	/**
	 * @param {FaErrorTrace|FaErrorTrace[]} trace
	 * @return {FaError}
	 */
	set(trace) {
		this.trace = Array.isArray(trace) ? trace : [trace];
		return this;
	}

	/**
	 * @param {FaErrorTrace} trace
	 * @return {FaError}
	 */
	append(trace) {
		this.trace.push(trace);
		return this;
	}

	/**
	 * @param {FaErrorTrace} trace
	 * @return {FaError}
	 */
	prepend(trace) {
		this.trace.unshift(trace);
		return this;
	}
}

// Error = FaError;
/**
 * @class {FaError}
 */
module.exports = FaError;
