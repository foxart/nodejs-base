'use strict';
/**
 * @class {FaErrorTrace}
 */
const FaErrorTrace = require('./FaErrorTrace');

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
		if (error.stack) {
			this.stack = error.stack;
			this.trace = FaError.stack(this.stack);
		} else {
			const stack = FaError.stack(new Error().stack);
			this.trace = stack.slice(1);
		}
	}

	/**
	 * @param {string} data
	 * @returns {FaErrorTrace[]}
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
				Match1[2] = Match1[2] ? Match1[2].replace(process.cwd(), '') : Match1[2];
				return new FaErrorTrace(Match1[1], Match1[2], Match1[3], Match1[4]);
			} else if (Match2) {
				Match2[1] = Match2[1] ? Match2[1].replace(process.cwd(), '') : Match2[1];
				return new FaErrorTrace(null, Match2[1], Match2[2], Match2[3]);
			} else if (Match3) {
				return new FaErrorTrace(Match3[1], null, null, null);
			} else {
				return new FaErrorTrace(item, null, null, null);
			}
		});
	}

	/**
	 * @param {number | undefined} level
	 * @returns {FaErrorTrace | FaErrorTrace[]}
	 */
	get(level = undefined) {
		if (level !== undefined) {
			return this.trace[level];
		} else {
			return this.trace;
		}
	}

	/**
	 * @param {number} level
	 * @returns {FaError}
	 */
	cut(level) {
		this.trace = [this.trace[level]];
		return this;
	}

	/**
	 * @param {FaErrorTrace | FaErrorTrace[]} trace
	 * @returns {FaError}
	 */
	set(trace) {
		this.trace = Array.isArray(trace) ? trace : [trace];
		return this;
	}

	/**
	 * @param {FaErrorTrace} trace
	 * @returns {FaError}
	 */
	append(trace) {
		this.trace.push(trace);
		return this;
	}

	/**
	 * @param {FaErrorTrace} trace
	 * @returns {FaError}
	 */
	prepend(trace) {
		this.trace.unshift(trace);
		return this;
	}
}

/**
 * @class {FaError}
 */
module.exports = FaError;
