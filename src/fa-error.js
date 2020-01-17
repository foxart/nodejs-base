'use strict';
const FaParser = require('./fa-parser');

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
			this.trace = FaParser.stack(this.stack);
		} else {
			const stack = FaParser.stack(new Error().stack);
			stack.shift();
			this.trace = stack;
		}
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
// ReferenceError = FaError;
/**
 * @class {FaError}
 */
module.exports = FaError;
