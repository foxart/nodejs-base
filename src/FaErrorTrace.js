'use strict';

/**
 * @constructor
 */
class FaErrorTrace {
	/**
	 * @param {*} method
	 * @param {*} path
	 * @param {*} line
	 * @param {*} column
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
