'use strict';
const Wrapper = require('./Wrapper');

class WrapperJson extends Wrapper {
	/**
	 * @constructor
	 */
	constructor() {
		super();
	}

	/**
	 * @param {string} data
	 * @returns {string}
	 */
	beautify(data) {
		return `${data}`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	array(data, length, level) {
		const result = length ? `${data}${this.nl}${this.getTab(level - 1)}` : '';
		return `[${result}]`;
	}

	/**
	 * @param {string} data
	 * @param {number} key
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	arrayItem(data, key, length, level) {
		let result;
		if (key === length - 1) {
			result = `${data}`;
		} else {
			result = `${data},`;
		}
		return `${this.nl}${this.getTab(level)}${result}`;
	}

	/**
	 * @param {boolean} data
	 * @returns {string}
	 */
	bool(data) {
		return `${data}`;
	}

	/**
	 * @param {ArrayBuffer} data
	 * @param {number} length
	 * @returns {string}
	 */
	buffer(data, length) {
		return `${JSON.stringify(data)}`;
	}

	/**
	 * @param {object} data
	 * @param {string} key
	 * @returns {string}
	 */
	circular(data, key) {
		return `"<circular(${key})>"`;
	}

	/**
	 * @param {Date} data
	 * @returns {string}
	 */
	date(data) {
		return `"${data.toJSON()}"`;
	}

	/**
	 * @param {FaError} data
	 * @param {string} trace
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	error(data, trace, length, level) {
		const result = [
			`${this.nl}${this.getTab(level)}"name": "${this.escapeText(data.name)}"`,
			`${this.nl}${this.getTab(level)}"message": "${this.escapeText(data.message)}"`,
			`${this.nl}${this.getTab(level)}"trace": [${trace}${this.nl}${this.getTab(level)}]`
		].join(`,`);
		return `{${result}${this.nl}${this.getTab(level - 1)}}`;
	}

	/**
	 * @param {FaErrorTrace} data
	 * @param {number} index
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	errorTrace(data, index, length, level) {
		const trace = [
			`${this.nl}${this.getTab(level + 2)}"method": "${this.escapeText(data.method)}"`,
			`${this.nl}${this.getTab(level + 2)}"path": "${this.escapeText(data.path)}"`,
			`${this.nl}${this.getTab(level + 2)}"line": ${data['line']}`,
			`${this.nl}${this.getTab(level + 2)}"column": ${data['column']}`
		].join(`,`);
		let result;
		if (index === length - 1) {
			result = `${this.getTab(level - 1)}{${trace}${this.nl}${this.getTab(level + 1)}}`;
		} else {
			result = `${this.getTab(level - 1)}{${trace}${this.nl}${this.getTab(level + 1)}},`;
		}
		return `${this.nl}${this.getTab(level)}${result}`;
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	float(data) {
		return `${data}`;
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	function(data, level) {
		return `"${this.escapeText(data)}"`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @returns {string}
	 */
	json(data, length) {
		return `"${this.escapeText(data)}"`;
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	int(data) {
		return `${data}`;
	}

	/**
	 * @param {object} data
	 * @returns {string}
	 */
	mongoId(data) {
		return `"${data.toString()}"`;
	}

	/**
	 * @param {null} data
	 * @returns {string}
	 */
	null(data) {
		return `${data}`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	object(data, length, level) {
		const result = length ? `${data}${this.nl}${this.getTab(level - 1)}` : '';
		return `{${result}}`;
	}

	/**
	 * @param {string} data
	 * @param {string} key
	 * @param {number} index
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	objectItem(data, key, index, length, level) {
		let result;
		if (index === length - 1) {
			result = `"${key}": ${data}`;
		} else {
			result = `"${key}": ${data},`;
		}
		return `${this.nl}${this.getTab(level)}${result}`;
	}

	/**
	 * @param {RegExp} data
	 * @returns {string}
	 */
	regExp(data) {
		return `"${data.toString().replace(/\\/g, '\\\\')}"`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	string(data, length, level) {
		return `"${this.escapeText(data)}"`;
	}

	/**
	 * @param {undefined} data
	 * @returns {string}
	 */
	undefined(data) {
		return `"${data}"`;
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	xml(data, level) {
		return `"${this.escapeText(data)}"`;
	}

	/**
	 * @param {*} data
	 * @returns {string}
	 */
	unknown(data) {
		return `"${data}"`;
	}
}

/**
 * @class {WrapperJson}
 */
module.exports = WrapperJson;
