'use strict';

/**
 * @constructor
 */
class FaErrorTrace {
	/**
	 * @param {string | null} method
	 * @param {string | null} path
	 * @param {string | null} line
	 * @param {string | null} column
	 * @returns {{path: *, method: *, line: *, column: *}}
	 */
	constructor(method, path, line, column) {
		this.method = method;
		this.path = path;
		this.line = line;
		this.column = column;
		return this;
	}
}

/**
 * @class {FaErrorTrace}
 */
module.exports = FaErrorTrace;
