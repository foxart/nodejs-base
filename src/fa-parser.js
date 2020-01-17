'use strict';

/**
 * @constructor
 */
class FaParser {
	/**
	 * @param {string} data
	 * @return {Array}
	 */
	static stack(data) {
		const list = data.split('\n').filter((item) => item);
		list.splice(0, 1);
		const Expression1 = new RegExp('^\\s+at\\s(.+)\\s\\((.+):(\\d+):(\\d+)\\)$');
		const Expression2 = new RegExp('^\\s+at\\s(.+):(\\d+):(\\d+)$');
		const Expression3 = new RegExp('^\\s+at\\s(.+)$');
		return list.map((item) => {
			const Match1 = Expression1.exec(item);
			const Match2 = Expression2.exec(item);
			const Match3 = Expression3.exec(item);
			if (Match1) {
				return {
					method: Match1[1],
					path: Match1[2],
					line: Match1[3],
					column: Match1[4],
				};
			} else if (Match2) {
				return {
					method: null,
					path: Match2[1],
					line: Match2[2],
					column: Match2[3],
				};
			} else if (Match3) {
				return {
					method: Match3[1],
					path: null,
					line: null,
					column: null,
				};
			} else {
				return {
					method: item,
					path: null,
					line: null,
					column: null,
				};
			}
		});
	}
}

/** @class {FaParser} */
module.exports = FaParser;
