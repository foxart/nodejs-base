/* https://www.compart.com/en/unicode/category/So */
'use strict';

/**
 * @constructor
 */
class Color {
	/**
	 * @returns {string}
	 */
	static get black() {
		return '\x1b[30m';
	}

	/**
	 * @returns {string}
	 */
	static get blue() {
		return '\x1b[34m';
	}

	/**
	 * @returns {string}
	 */
	static get cyan() {
		return '\x1b[36m';
	}

	/**
	 * @returns {string}
	 */
	static get green() {
		return '\x1b[32m';
	}

	/**
	 * @returns {string}
	 */
	static get magenta() {
		return '\x1b[35m';
	}

	/**
	 * @returns {string}
	 */
	static get red() {
		return '\x1b[31m';
	}

	/**
	 * @returns {string}
	 */
	static get white() {
		return '\x1b[37m';
	}

	/**
	 * @returns {string}
	 */
	static get yellow() {
		return '\x1b[33m';
	}
}

/**
 * @class {Color}
 */
module.exports = Color;
