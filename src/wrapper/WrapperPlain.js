'use strict';
const Wrapper = require('./Wrapper');

class WrapperPlain extends Wrapper {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		super.tab = `    `;
	}

	/**
	 * @param {string} key
	 * @param {number|string} value
	 * @returns {string}
	 */
	_type(key, value) {
		return `<${key}(${value})>`;
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
		return `${this._type('array', length)} [${result}]`;
	}

	/**
	 * @param {string} data
	 * @param {number} index
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	arrayItem(data, index, length, level) {
		let result;
		if (index === length - 1) {
			result = `${index}: ${data}`;
		} else {
			result = `${index}: ${data},`;
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
		return this._type('buffer', length);
	}

	/**
	 * @param {object} data
	 * @param {string} key
	 * @returns {string}
	 */
	circular(data, key) {
		return this._type('circular', key);
	}

	/**
	 * @param {Date} data
	 * @returns {string}
	 */
	date(data) {
		return this._type('date', data.toString());
	}

	/**
	 * @param {FaError} data
	 * @param {string} trace
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	error(data, trace, length, level) {
		return `${this._type(data.name, data.message)} [${trace}${this.nl}${this.getTab(level - 1)}]`;
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
			`${data.path}`,
			`${data.method}`,
			`${data.line}:${data.column}`
		].join(' ');
		let result;
		if (index === length - 1) {
			result = `${index}: ${trace}`;
		} else {
			result = `${index}: ${trace},`;
		}
		return `${this.nl}${this.getTab(level)}${result}`;
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	float(data) {
		return `<float> ${data}`;
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	function(data, level) {
		const callback = (item) => item;
		return `${this.indentText(data, level, callback)}`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @returns {string}
	 */
	json(data, length) {
		return `${this._type('json', length)} ${data}`;
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	int(data) {
		return `<int> ${data}`;
	}

	/**
	 * @param {object} data
	 * @returns {string}
	 */
	mongoId(data) {
		return this._type('mongoId', data.toString());
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
		return `${this._type('object', length)} {${result}}`;
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
			result = `${key}: ${data}`;
		} else {
			result = `${key}: ${data},`;
		}
		return `${this.nl}${this.getTab(level)}${result}`;
	}

	/**
	 * @param {RegExp} data
	 * @returns {string}
	 */
	regExp(data) {
		return this._type('regExp', data.toString());
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	string(data, length, level) {
		const callback = (item) => item;
		return `${this._type('string', length)} ${this.indentText(data, level, callback)}`;
	}

	/**
	 * @param {undefined} data
	 * @returns {string}
	 */
	undefined(data) {
		return `${data}`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @returns {string}
	 */
	xml(data, length) {
		return `${this._type('xml', length)} ${data}`;
	}

	/**
	 * @param {*} data
	 * @returns {string}
	 */
	unknown(data) {
		return this._type('unknown', data);
	}
}

/**
 * @class {WrapperPlain}
 */
module.exports = WrapperPlain;
