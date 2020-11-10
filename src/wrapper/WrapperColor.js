'use strict';
const bg = require('../unicode/Background');
const bx = require('../unicode/Box');
const cl = require('../unicode/Color');
const ef = require('../unicode/Effect');
const Wrapper = require('./Wrapper');

class WrapperColor extends Wrapper {
	/**
	 * @constructor
	 */
	constructor() {
		super();
		super.tab = `${this._dim(bx.vertical)}   `;
	}

	/**
	 * @param {*} symbol
	 * @returns {string}
	 * @private
	 */
	_bright(symbol) {
		return `${ef.reset}${ef.bold}${cl.white}${symbol}${ef.reset}`;
	}

	/**
	 * @param {*} symbol
	 * @returns {string}
	 * @private
	 */
	_normal(symbol) {
		return `${ef.reset}${cl.white}${symbol}${ef.reset}`;
	}

	/**
	 * @param {*} symbol
	 * @returns {string}
	 * @private
	 */
	_dim(symbol) {
		return `${ef.reset}${ef.dim}${cl.white}${symbol}${ef.reset}`;
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
			result = `${ef.reset}${this._bright(key)}${this._dim(':')} ${data}`;
		} else {
			result = `${ef.reset}${this._bright(key)}${this._dim(':')} ${data}${this._dim(',')}`;
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
		result.push(this._normal(key));
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
		return `${data}${ef.reset}`;
	}

	/**
	 * @param {string} date
	 * @param {string} trace
	 * @param {string} data
	 * @returns {string}
	 */
	log(date, trace, data) {
		return `${ef.reset}${ef.bold}${cl.white}[${ef.bold}${cl.yellow}${date}${cl.white}] ${trace} ${ef.reset}${data}`;
	}

	/**
	 * @param {FaErrorTrace} data
	 * @returns {string}
	 */
	logTrace(data) {
		return [
			`${ef.reset}${ef.bold}${cl.cyan}${data.method} `,
			`${ef.reset}${cl.yellow}${data.path}${this._dim(':')}`,
			`${ef.reset}${ef.bold}${cl.white}${data.line}${this._dim(':')}`,
			`${ef.reset}${ef.dim}${cl.yellow}${data.column}`
		].join('');
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	array(data, length, level) {
		const result = length ? `${data}${this.nl}${this.getTab(level - 1)}` : '';
		return `${ef.reset}${this._normal('[')}${result}${this._normal(']')}`;
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
			return `${ef.reset}${ef.bold}${cl.green}${data}`;
		} else {
			return `${ef.reset}${ef.bold}${cl.red}${data}`;
		}
	}

	/**
	 * @param {ArrayBuffer} data
	 * @param {number} length
	 * @returns {string}
	 */
	buffer(data, length) {
		return `${ef.reset}${this._type(`${bg.yellow}${cl.black}buffer`, length)}`;
	}

	/**
	 * @param {object} data
	 * @param {string} key
	 * @returns {string}
	 */
	circular(data, key) {
		return `${ef.reset}${this._type(`${bg.white}${cl.black}circular`, key)}`;
	}

	/**
	 * @param {Date} data
	 * @returns {string}
	 */
	date(data) {
		return `${ef.reset}${this._type(`${bg.blue}${cl.white}date`, data.toString())}`;
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
		result.push(this._type(`${bg.red}${cl.white}${data.name}`, data.message));
		result.push(`${this._normal('[')}${trace}${this.nl}${this.getTab(level - 1)}${this._normal(']')}`);
		return result.join(' ');
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
			`${ef.reset}${ef.dim}${cl.cyan}${data.method}`,
			`${ef.reset}${ef.dim}${cl.yellow}${data.path}`,
			`${ef.reset}${cl.red}${data.line}${this._dim(':')}${ef.reset}${ef.dim}${cl.yellow}${data.column}`
		].join(' ');
		let result;
		if (length === 1) {
			result = `${ef.reset}${bx.verticalLeft} ${this._normal(index)}${this._dim(': ')}${trace}`;
		} else if (index === 0) {
			result = `${ef.reset}${bx.topLeft} ${this._normal(index)}${this._dim(': ')}${trace}${this._dim(',')}`;
		} else if (index === length - 1) {
			result = `${ef.reset}${bx.bottomLeft} ${this._normal(index)}${this._dim(': ')}${trace}`;
		} else {
			result = `${ef.reset}${bx.verticalLeft} ${this._normal(index)}${this._dim(': ')}${trace}${this._dim(',')}`;
		}
		return `${this.nl}${this.getTab(level)}${result}`;
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	float(data) {
		return `${ef.reset}${cl.yellow}${data}`;
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	function(data, level) {
		const callback = (item) => {
			return `${ef.reset}${cl.blue}${item}`;
		};
		return `${ef.reset}${this.indentText(data, level, callback)}`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @returns {string}
	 */
	json(data, length) {
		return `${ef.reset}${this._type(`${bg.yellow}${cl.black}json`, length)} ${data}`;
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	int(data) {
		return `${ef.reset}${ef.bold}${cl.yellow}${data}`;
	}

	/**
	 * @param {object} data
	 * @returns {string}
	 */
	mongoId(data) {
		return `${ef.reset}${this._type(`${bg.blue}${cl.white}mongoId`, data.toString())}`;
	}

	/**
	 * @param {null} data
	 * @returns {string}
	 */
	null(data) {
		return `${ef.reset}${ef.bold}${cl.magenta}${data}`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	object(data, length, level) {
		const result = length ? `${data}${this.nl}${this.getTab(level - 1)}` : '';
		return `${ef.reset}${this._normal('{')}${result}${this._normal('}')}`;
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
		return `${ef.reset}${this._type(`${bg.blue}${cl.white}regExp`, data.toString())}`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	string(data, length, level) {
		const callback = (item) => {
			return `${this._dim(item)}`;
		};
		return `${ef.reset}${this.indentText(data, level, callback)}`;
	}

	/**
	 * @param {undefined} data
	 * @returns {string}
	 */
	undefined(data) {
		return `${ef.reset}${bg.magenta}${data}`;
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @returns {string}
	 */
	xml(data, length) {
		return `${ef.reset}${this._type(`${bg.yellow}${cl.black}xml`, length)} ${data}`;
	}

	/**
	 * @param {*} data
	 * @returns {string}
	 */
	unknown(data) {
		return `${ef.reset}${this._type(`${bg.white}${cl.black}unknown`, data)}`;
	}
}

/**
 * @class {WrapperColor}
 */
module.exports = WrapperColor;
