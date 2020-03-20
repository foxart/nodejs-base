'use strict';
module.exports = function map(f, a) {
	const result = []; // Create a new Array
	let i;
	/*some comment*/
	for (i = 0; i !== a.length; i++) {
		result[i] = f(a[i]);
	}
	console.log('<html lang="ru"><head><title>TEST</title></head></html>');
	return result;
};
