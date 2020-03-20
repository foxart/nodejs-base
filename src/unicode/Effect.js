/* https://www.compart.com/en/unicode/category/So */
'use strict';

/**
 * @constructor
 */
class Effect {
	/**
	 * @returns {string}
	 */
	static get blink() {
		return '\x1b[5m';
	}

	/**
	 * @returns {string}
	 */
	static get bold() {
		return '\x1b[1m';
	}

	/**
	 * @returns {string}
	 */
	static get dim() {
		return '\x1b[2m';
	}

	/**
	 * @returns {string}
	 */
	static get hidden() {
		return '\x1b[8m';
	}

	/**
	 * @returns {string}
	 */
	static get reset() {
		return '\x1b[0m';
	}

	/**
	 * @returns {string}
	 */
	static get reverse() {
		return '\x1b[7m';
	}

	/**
	 * @returns {string}
	 */
	static get underscore() {
		return '\x1b[4m';
	}
}

/**
 * @class {Effect}
 */
module.exports = Effect;
