/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects */
'use strict';
const FastXmlParser = require('fast-xml-parser');
const FaError = require('./FaError');
const FaBeautifierWrapperJson = require('./wrapper/WrapperJson');

class FaBeautifier {
	/**
	 * @param {*} Wrapper
	 * @property {Wrapper} wrapper
	 */
	constructor(Wrapper) {
		this.wrapper = new Wrapper();
	}

	/**
	 *
	 * @param {*} data
	 * @returns {string}
	 */
	getType(data) {
		if (data === null) {
			return 'null';
		} else if (typeof data === 'boolean') {
			return 'bool';
		} else if (typeof data === 'number') {
			return data % 1 === 0 ? 'int' : 'float';
		} else if (typeof data === 'function') {
			return 'function';
		} else if (typeof data === 'string') {
			if (this.isJson(data)) {
				return 'json';
			} else if (this.isXml(data)) {
				return 'xml';
			} else {
				return 'string';
			}
		} else if (typeof data === 'undefined') {
			return 'undefined';
		} else if (typeof data === 'object') {
			if (data instanceof Array) {
				return 'array';
			} else if (data instanceof Date) {
				return 'date';
			} else if (data instanceof Error) {
				return 'error';
			} else if (data instanceof RegExp) {
				return 'regExp';
			} else if (data instanceof Promise) {
				return 'promise';
			} else if (data instanceof ArrayBuffer) {
				return 'arrayBuffer';
			} else if (data instanceof Map) {
				return 'map';
			} else if (data instanceof WeakMap) {
				return 'weakMap';
			} else if (Buffer.isBuffer(data)) {
				return 'buffer';
			} else if (this.isMongoId(data)) {
				return 'mongoId';
			} else {
				return 'object';
			}
		}
	}

	/**
	 * @param {*} data
	 * @returns {boolean}
	 */
	isJson(data) {
		try {
			const json = JSON.parse(data);
			return typeof json === 'object' && json !== null;
		} catch (e) {
			return false;
		}
	}

	/**
	 * @param {*} data
	 * @returns {boolean}
	 */
	isMongoId(data) {
		try {
			return new RegExp('^[0-9a-fA-F]{24}$').test(data.toString());
		} catch (e) {
			return false;
		}
	}

	/**
	 * @param {*} data
	 * @returns {boolean}
	 */
	isXml(data) {
		try {
			return FastXmlParser.validate(data) === true;
		} catch (e) {
			return false;
		}
	}

	/**
	 * @param {Array} data
	 * @param {number} level
	 * @param {WeakMap} circular
	 * @returns {string}
	 */
	array(data, level, circular) {
		const length = data.length;
		const result = [];
		if (length === 0) {
			return this.wrapper.array('', length, level);
		}
		for (let i = 0; i < length; i++) {
			let content;
			if (circular.has(data[i])) {
				content = this.wrapper.circular(data, circular.get(data[i]));
			} else {
				const type = this.getType(data[i]);
				if (type === 'array' || type === 'object') {
					circular.set(data[i], i);
				}
				content = this.beautify(data[i], level, circular);
			}
			result.push(this.wrapper.arrayItem(content, i, length, level));
		}
		return this.wrapper.array(result.join(''), length, level);
	}

	/**
	 * @param {Object} data
	 * @param {number} level
	 * @param {WeakMap} circular
	 * @returns {string}
	 */
	object(data, level, circular) {
		const keys = Object.keys(data);
		const length = keys.length;
		const result = [];
		if (length === 0) {
			return this.wrapper.object('', length, level);
		}
		for (let i = 0; i < length; i++) {
			let content;
			if (circular.has(data[keys[i]])) {
				content = this.wrapper.circular(data[keys[i]], circular.get(data[keys[i]]));
			} else {
				const type = this.getType(data[keys[i]]);
				if (type === 'array' || type === 'object') {
					circular.set(data[keys[i]], keys[i]);
				}
				content = this.beautify(data[keys[i]], level, circular);
			}
			result.push(this.wrapper.objectItem(content, keys[i], i, length, level));
		}
		return this.wrapper.object(result.join(''), length, level);
	}

	/**
	 * @param {Error | FaError} data
	 * @param {number} level
	 * @param {WeakMap} circular
	 * @returns {string}
	 */
	error(data, level, circular) {
		const trace = data.trace ? data.trace : FaError.stack(data.stack);
		const length = trace.length;
		const result = [];
		if (length === 0) {
			return '';
		}
		for (let i = 0; i < length; i++) {
			result.push(`${this.wrapper.errorTrace(trace[i], i, length, level)}`);
		}
		return this.wrapper.error(data, result.join(''), length, level);
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	function(data, level) {
		if (this.wrapper instanceof FaBeautifierWrapperJson) {
			return this.wrapper.function(data, level);
		}
		return this.wrapper.function(data, level);
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @param {WeakMap} circular
	 * @returns {string}
	 */
	json(data, level, circular) {
		if (this.wrapper instanceof FaBeautifierWrapperJson) {
			return this.wrapper.json(data, data.length);
		}
		return this.wrapper.json(this.beautify(JSON.parse(data), level, circular), data.length);
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	string(data, level) {
		if (this.wrapper instanceof FaBeautifierWrapperJson) {
			// return this.wrapper.string(data, data.length, level);
		}
		if (data.length > 150) {
			// data = data.substring(0, 150);
		}
		return this.wrapper.string(data, data.length, level);
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @param {WeakMap} circular
	 * @returns {string}
	 */
	xml(data, level, circular) {
		if (this.wrapper instanceof FaBeautifierWrapperJson) {
			return this.wrapper.xml(data, data.length);
		}
		return this.wrapper.xml(this.beautify(FastXmlParser.parse(data), level, circular), data.length);
	}

	/**
	 *
	 * @param {*} data
	 * @param {number} level
	 * @param {WeakMap} circular
	 * @returns {string}
	 */
	beautify(data, level = 0, circular = new WeakMap()) {
		let result;
		switch (this.getType(data)) {
			case 'array':
				result = this.array(data, level + 1, circular);
				break;
			case 'bool':
				result = this.wrapper.bool(data);
				break;
			case 'buffer':
				result = this.wrapper.buffer(data, data.byteLength);
				break;
			case 'date':
				result = this.wrapper.date(data);
				break;
			case 'error':
				result = this.error(data, level + 1, circular);
				break;
			case 'float':
				result = this.wrapper.float(data);
				break;
			case 'function':
				result = this.function(data.toString(), level);
				break;
			case 'json':
				result = this.json(data, level, circular);
				break;
			case 'int':
				result = this.wrapper.int(data);
				break;
			case 'mongoId':
				result = this.wrapper.mongoId(data);
				break;
			case 'null':
				result = this.wrapper.null(data);
				break;
			case 'object':
				result = this.object(data, level + 1, circular);
				break;
			case 'regExp':
				result = this.wrapper.regExp(data);
				break;
			case 'string':
				result = this.string(data, level);
				break;
			case 'undefined':
				result = this.wrapper.undefined(data);
				break;
			case 'xml':
				result = this.xml(data, level, circular);
				break;
			default:
				result = this.wrapper.unknown(data);
		}
		if (level === 0) {
			return this.wrapper.beautify(result);
		} else {
			return result;
		}
	}
}

/**
 * @class {FaBeautifier}
 */
module.exports = FaBeautifier;
