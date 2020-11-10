/* https://www.compart.com/en/unicode/category/So */
'use strict';

/**
 * @constructor
 */
class Background {
	/**
	 * @returns {string}
	 */
	static get black() {
		return '\x1b[40m';
	}

	/**
	 * @returns {string}
	 */
	static get blue() {
		return '\x1b[44m';
	}

	/**
	 * @returns {string}
	 */
	static get cyan() {
		return '\x1b[46m';
	}

	/**
	 * @returns {string}
	 */
	static get green() {
		return '\x1b[42m';
	}

	/**
	 * @returns {string}
	 */
	static get magenta() {
		return '\x1b[45m';
	}

	/**
	 * @returns {string}
	 */
	static get red() {
		return '\x1b[41m';
	}

	/**
	 * @returns {string}
	 */
	static get white() {
		return '\x1b[47m';
	}

	/**
	 * @returns {string}
	 */
	static get yellow() {
		return '\x1b[43m';
	}
}

/**
 * @class {Background}
 */
module.exports = Background;
