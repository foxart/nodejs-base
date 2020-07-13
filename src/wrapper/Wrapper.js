'use strict';
const WrapperInterface = require('./WrapperInterface');

/**
 * @constructor
 */
class Wrapper extends WrapperInterface {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		this.nl = '\n';
		this.tab = '    ';
	}

	/**
	 * @param {number} level
	 * @returns {string}
	 * @returns {string}
	 */
	getTab(level) {
		const result = [];
		for (let i = 0; i < level; i++) {
			result.push(this.tab);
		}
		return result.join('');
	}

	/**
	 * @param {string} string
	 * @returns {string}
	 */
	escapeText(string) {
		if (string) {
			return string
				.replace(/[\\]/g, '\\\\')
				.replace(/["]/g, '\\\"')
				.replace(/[\/]/g, '\\/')
				.replace(/[\b]/g, '\\b')
				.replace(/[\f]/g, '\\f')
				.replace(/[\n]/g, '\\n')
				.replace(/[\r]/g, '\\r')
				.replace(/[\t]/g, '\\t');
		} else {
			return string;
		}
	}

	/**
	 * @param {string} string
	 * @returns {string}
	 */
	escapeHtml(string) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			'\'': '&#039;'
		};
		if (string) {
			return string.replace(/[&<>"']/g, (m) => map[m]);
		} else {
			return string;
		}
	}

	/**
	 *
	 * @param {string} data
	 * @param {number} level
	 * @param {function} callback
	 * @returns {string}
	 */
	indentText(data, level, callback) {
		const regExp = /^(\t*)(.*)$/;
		const lines = data.split(this.nl);
		const result = lines.map((item) => {
			const match = regExp.exec(item);
			return `${match[1].replace(/\t/g, this.getTab(1))}${callback.call(this, match[2])}`;
		});
		if (level) {
			return result.join(`${this.nl}${this.getTab(level + 1)}`);
		} else {
			return result.join(`${this.nl}`);
		}
	}
}

/**
 * @class {Wrapper}
 */
module.exports = Wrapper;
