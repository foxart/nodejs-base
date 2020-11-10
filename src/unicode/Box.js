/* https://www.compart.com/en/unicode/category/So */
'use strict';

/**
 * @constructor
 */
class Box {
	/**
	 * horizontal
	 * @returns {string}
	 */
	static get horizontal() {
		return '\u2500';
	}

	/**
	 * vertical
	 * @returns {string}
	 */
	static get vertical() {
		return '\u2502';
	}

	/**
	 * vertical and horizontal
	 * @returns {string}
	 */
	static get cross() {
		return '\u253c';
	}

	/**
	 * up and horizontal
	 * @returns {string}
	 */
	static get horizontalBottom() {
		return '\u2534';
	}

	/**
	 * down and horizontal
	 * @returns {string}
	 */
	static get horizontalTop() {
		return '\u252c';
	}

	/**
	 * vertical and right
	 * @returns {string}
	 */
	static get verticalLeft() {
		return '\u251c';
	}

	/**
	 * vertical and left
	 * @returns {string}
	 */
	static get verticalRight() {
		return '\u2524';
	}

	/**
	 * down and right
	 * @returns {string}
	 */
	static get topLeft() {
		return '\u250c';
	}

	/**
	 * down and left
	 * @returns {string}
	 */
	static get topRight() {
		return '\u2510';
	}

	/**
	 * up and right
	 * @returns {string}
	 */
	static get bottomLeft() {
		return '\u2514';
	}

	/**
	 * up and left
	 * @returns {string}
	 */
	static get bottomRight() {
		return '\u2518';
	}

	/**
	 * @returns {string}
	 */
	static test() {
		const fcb = Box;
		const test = {
			square: [
				`${fcb.topLeft}${fcb.horizontal}${fcb.topRight}`,
				`${fcb.vertical}x${fcb.vertical}`,
				`${fcb.bottomLeft}${fcb.horizontal}${fcb.bottomRight}`
			],
			columns: [
				`${fcb.topLeft}${fcb.horizontal}${fcb.horizontalTop}${fcb.horizontal}${fcb.topRight}`,
				`${fcb.vertical}x${fcb.vertical}x${fcb.vertical}`,
				`${fcb.bottomLeft}${fcb.horizontal}${fcb.horizontalBottom}${fcb.horizontal}${fcb.bottomRight}`
			],
			rows: [
				`${fcb.topLeft}${fcb.horizontal}${fcb.topRight}`,
				`${fcb.vertical}x${fcb.vertical}`,
				`${fcb.verticalLeft}${fcb.horizontal}${fcb.verticalRight}`,
				`${fcb.vertical}x${fcb.vertical}`,
				`${fcb.bottomLeft}${fcb.horizontal}${fcb.bottomRight}`
			],
			table: [
				`${fcb.topLeft}${fcb.horizontal}${fcb.horizontalTop}${fcb.horizontal}${fcb.topRight}`,
				`${fcb.vertical}x${fcb.vertical}x${fcb.vertical}`,
				`${fcb.verticalLeft}${fcb.horizontal}${fcb.cross}${fcb.horizontal}${fcb.verticalRight}`,
				`${fcb.vertical}x${fcb.vertical}x${fcb.vertical}`,
				`${fcb.bottomLeft}${fcb.horizontal}${fcb.horizontalBottom}${fcb.horizontal}${fcb.bottomRight}`
			]
		};
		return ((Object.entries(test).map(function([key, value]) {
			return `${key}\n${value.join('\n')}`;
		})).join('\n'));
	}
}

/**
 * @class {Box}
 */
module.exports = Box;
