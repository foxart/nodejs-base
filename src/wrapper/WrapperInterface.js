'use strict';

/**
 * @constructor
 */
class WrapperInterface {
	/**
	 * @param {string} data
	 * @returns {string}
	 */
	beautify(data) {
		throw new Error('beautify not implemented');
	}

	/**
	 * @param {string} date
	 * @param {string} trace
	 * @param {string} data
	 * @returns {string}
	 */
	log(date, trace, data) {
		throw new Error('log not implemented');
	}

	/**
	 * @param {FaErrorTrace} data
	 * @returns {string}
	 */
	logTrace(data) {
		throw new Error('logTrace not implemented');
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	array(data, length, level) {
		throw new Error('array not implemented');
	}

	/**
	 *
	 * @param {string} data
	 * @param {number} key
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	arrayItem(data, key, length, level) {
		throw new Error('arrayItem not implemented');
	}

	/**
	 * @param {boolean} data
	 * @returns {string}
	 */
	bool(data) {
		throw new Error('bool not implemented');
	}

	/**
	 * @param {ArrayBuffer} data
	 * @param {number} length
	 * @returns {string}
	 */
	buffer(data, length) {
		throw new Error('buffer not implemented');
	}

	/**
	 * @param {object} data
	 * @param {string} key
	 * @returns {string}
	 */
	circular(data, key) {
		throw new Error('circular not implemented');
	}

	/**
	 * @param {Date} data
	 * @returns {string}
	 */
	date(data) {
		throw new Error('date not implemented');
	}

	/**
	 * @param {FaError} data
	 * @param {string} trace
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	error(data, trace, length, level) {
		throw new Error('error not implemented');
	}

	/**
	 * @param {FaErrorTrace} data
	 * @param {number} index
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	errorTrace(data, index, length, level) {
		throw new Error('errorTrace not implemented');
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	float(data) {
		throw new Error('float not implemented');
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	function(data, level) {
		throw new Error('function not implemented');
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @returns {string}
	 */
	json(data, length) {
		throw new Error('json not implemented');
	}

	/**
	 * @param {number} data
	 * @returns {string}
	 */
	int(data) {
		throw new Error('int not implemented');
	}

	/**
	 * @param {object} data
	 * @returns {string}
	 */
	mongoId(data) {
		throw new Error('mongoId not implemented');
	}

	/**
	 * @param {null} data
	 * @returns {string}
	 */
	null(data) {
		throw new Error('null not implemented');
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	object(data, length, level) {
		throw new Error('object not implemented');
	}

	/**
	 *
	 * @param {string} data
	 * @param {string} key
	 * @param {number} index
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	objectItem(data, key, index, length, level) {
		throw new Error('objectItem not implemented');
	}

	/**
	 * @param {RegExp} data
	 * @returns {string}
	 */
	regExp(data) {
		throw new Error('regExp not implemented');
	}

	/**
	 * @param {string} data
	 * @param {number} length
	 * @param {number} level
	 * @returns {string}
	 */
	string(data, length, level) {
		throw new Error('string not implemented');
	}

	/**
	 * @param {undefined} data
	 * @returns {string}
	 */
	undefined(data) {
		throw new Error('undefined not implemented');
	}

	/**
	 * @param {string} data
	 * @param {number} level
	 * @returns {string}
	 */
	xml(data, level) {
		throw new Error('xml not implemented');
	}

	/**
	 * @param {*} data
	 * @returns {string}
	 */
	unknown(data) {
		throw new Error('unknown not implemented');
	}
}

/**
 * @class {WrapperInterface}
 */
module.exports = WrapperInterface;
