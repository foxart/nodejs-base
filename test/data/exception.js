'use strict';
module.exports = (() => {
	try {
		a = 1;
	} catch (e) {
		return new Error(e);
	}
})();
