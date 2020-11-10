'use strict';
const Wrapper = require('./Wrapper');

class WrapperHtml extends Wrapper {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		super.tab = `<span class="fa-tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
	}

	/**
	 * @param {*} symbol
	 * @returns {string}
	 */
	_bright(symbol) {
		return `<span class="fa-bright">${symbol}</span>`;
	}

	/**
	 * @param {*} symbol
	 * @returns {string}
	 */
	_normal(symbol) {
		return `<span class="fa-normal">${symbol}</span>`;
	}

	/**
	 * @param {*} symbol
	 * @returns {string}
	 */
	_dim(symbol) {
		return `<span class="fa-dim">${symbol}</span>`;
	}

	/**
	 * @param {string} data
	 * @param {number|string} key
	 * @param {number} index
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 * @private
	 */
	_item(data, key, index, length, level) {
		let result;
		if (index === length - 1) {
			result = `${this._normal(key)}${this._dim(':')} ${data}`;
		} else {
			result = `${this._normal(key)}${this._dim(':')} ${data}${this._dim(',')}`;
		}
		return `${this.nl}${this.getTab(level)}${result}`;
	}

	/**
	 * @param {string} key
	 * @param {number|string} value
	 * @returns {string}
	 * @private
	 */
	_type(key, value) {
		const result = [];
		result.push(this._normal('<'));
		result.push(this._bright(key));
		result.push(this._dim('('));
		result.push(this._normal(value));
		result.push(this._dim(')'));
		result.push(this._normal('>'));
		return result.join('');
	}

	/**
	 * @param {string} data
	 * @returns {string}
	 */
	beautify(data) {
		return `<div class="fa-beautifier">${data}</div>`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	array(data, length, level) {
		const result = length ? `${data}${this.nl}${this.getTab(level - 1)}` : '';
		return `<span class="fa-array">${this._type('array', length)}</span> [${result}]`;
	}

	/**
	 * @param {string} data
	 * @param {number} key
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	arrayItem(data, key, length, level) {
		return this._item(data, key, key, length, level);
	}

	/**
	 * @param {boolean} data
	 * @returns {string}
	 */
	bool(data) {
		if (data) {
			return `<span class="fa-bool-true">${data}</span>`;
		} else {
			return `<span class="fa-bool-false">${data}</span>`;
		}
	}

	/**
	 * @param {ArrayBuffer} data
	 * @param {number} length
	 * @returns {string}
	 */
	buffer(data, length) {
		return `<span class="fa-buffer">${this._type('buffer', length)}</span>`;
	}

	/**
	 * @param {object} data
	 * @param {string} key
	 * @returns {string}
	 */
	circular(data, key) {
		return `<span class="fa-circular">${this._type('circular', key)}</span>`;
	}

	/**
	 * @param {Date} data
	 * @returns {string}
	 */
	date(data) {
		return `<span class="fa-date">${this._type('date', data.toString())}</span>`;
	}

	/**
	 * @param {FaError} data
	 * @param {string} trace
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	error(data, trace, length, level) {
		const result = [];
		result.push(this._type(`<span class="fa-error-name">${data.name}</span>`, `<span class="fa-error-message">${data.message}</span>`));
		result.push(`[${trace}${this.nl}${this.getTab(level - 1)}]`);
		return `<span class="fa-error">${result.join(' ')}</span>`;
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
			`<span class="fa-error-method">${this.escapeHtml(data.method)}</span> `,
			`<span class="fa-error-path">${this.escapeHtml(data.path)}</span>:`,
			`<span class="fa-error-line">${data.line}</span>:`,
			`<span class="fa-error-column">${data.column}</span>`
		].join('');
		let result;
		if (index === length - 1) {
			result = `${this.errorTraceKey(index)}${trace}`;
		} else {
			result = `${this.errorTraceKey(index)}${trace}${this._dim(',')}`;
		}
		return `${this.nl}${this.getTab(level)}${result}`;
	}

	/**
	 * @param {number} key
	 * @returns {string}
	 */
	errorTraceKey(key) {
		return `<span class="fa-error-key">${key}</span>${this._dim(': ')}`;
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	float(data) {
		return `<span class="fa-float">${data}</span>`;
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	function(data, level) {
		const callback = (item) => {
			return `<span class="fa-function-line">${this.escapeHtml(item)}</span>`;
		};
		return `<span class="fa-function">${this.indentText(data, level, callback)}</span>`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @returns {string}
	 */
	json(data, length) {
		return `<span class="fa-json">${this._type('json', length)}</span> ${data}`;
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	int(data) {
		return `<span class="fa-int">${data}</span>`;
	}

	/**
	 * @param {object} data
	 * @returns {string}
	 */
	mongoId(data) {
		return `<span class="fa-mongo-id">${this._type('mongoId', data.toString())}</span>`;
	}

	/**
	 * @param {null} data
	 * @returns {string}
	 */
	null(data) {
		return `<span class="fa-null">${data}</span>`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	object(data, length, level) {
		const result = length ? `${data}${this.nl}${this.getTab(level - 1)}` : '';
		return `<span class="fa-object">${this._type('object', length)}</span> {${result}}`;
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
		return this._item(data, key, index, length, level);
	}

	/**
	 * @param {RegExp} data
	 * @returns {string}
	 */
	regExp(data) {
		return `<span class="fa-reg-exp">${this._type('regExp', data.toString())}</span>`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	string(data, length, level) {
		const callback = (item) => {
			return `<span class="fa-string-line">${this.escapeHtml(item)}</span>`;
		};
		return `<span class="fa-string">${this._type('string', length)} ${this.indentText(data, level, callback)}</span>`;
	}

	/**
	 * @param {undefined} data
	 * @returns {string}
	 */
	undefined(data) {
		return `<span class="fa-undefined">${data}</span>`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @returns {string}
	 */
	xml(data, length) {
		return `<span class="fa-xml">${this._type('xml', length)}</span> ${data}`;
	}

	/**
	 * @param {*} data
	 * @returns {string}
	 */
	unknown(data) {
		return `<span class="fa-unknown">${this._type('unknown', data)}</span>`;
	}
}

/**
 * @class {WrapperHtml}
 */
module.exports = WrapperHtml;
