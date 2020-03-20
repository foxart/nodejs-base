'use strict';
const myPromise = new Promise((resolve, reject) => {
	resolve();
}).then(() => {
	throw new Error('Something failed');
}).catch(() => {
}).then(() => {
});
module.exports = myPromise;
