'use strict';
process.stdout.write('\x1Bc');
const FaError = require('../error');
const ObjectId = require('mongodb').ObjectID;
const FXP = require('fast-xml-parser');
const fs = require('fs');
/**/
const FaBeautifierConsole = require('../beautifier-color');
const FaBeautifierPlain = require('../beautifier-plain');
const FaBeautifierJson = require('../beautifier-json');
const FaBeautifierHtml = require('../beautifier-html');
const FaBeautifierUnicode = require('../unicode');
/**/
const myArr = require('./data/array');
const myObj = require('./data/object');
const myBuffer = require('./data/buffer');
const myFunc = require('./data/function');
const myStr = require('./data/string');
const myMap = require('./data/map');
const myWeakMap = require('./data/weak-map');
const myPromise = require('./data/promise');
const myException = require('./data/exception');
const myJson = require('./data/json');
const myXml = require('./data/xml');
const myFile = fs.readFileSync('./test/sample/index.css');
const myReg = /(?:\d{3}|\(\d{3}\))([-\/.])\d{3}\1\d{4}/;
const myDate = new Date();
const myArrayBuffer = new ArrayBuffer(8);
const myFaError = new FaError('my error');
const myJsonObj = JSON.stringify(myObj);
const myJsonArray = JSON.stringify(myArr);
/**/
myObj.a2.b22.c222 = myObj;
myObj.a2.b21 = {
	a: 1, MyCirc_myObj: myObj, c: { MyCirc_myObj_a2: myObj.a2, d: {} }
};
// myArr[1][1][1] = myObj.a2.b22.c222;
// myObj.circ3 = myObj.a2.b21;

function _filterXml(data) {
	let result = {};
	if (data === undefined) {
		// 	result = "undefined";
	} else if (data === null) {
		result = 'null';
	} else if (Array.isArray(data)) {
		const res = [];
		data.forEach(function(value, key) {
			res[key] = _filterXml(value);
		});
		result = res;
	} else if (typeof data === 'object') {
		Object.entries(data).forEach(function([key, value]) {
			result[key] = _filterXml(value);
		});
	} else {
		result = data;
	}
	return result;
}

function toXml(data, options = {}) {
	// const result;
	let xml;
	data = data === null ? {} : data;
	if (typeof data === 'object') {
		if (data.hasOwnProperty('xml')) {
			xml = _filterXml(data);
		} else {
			xml = _filterXml({ xml: data });
		}
	} else {
		xml = { xml: data };
	}
	// eslint-disable-next-line new-cap
	return new FXP.j2xParser(options).parse(xml);
}

function writeHtml(data) {
	const result = [];
	result.push('<html lang="en">');
	result.push('<head>');
	result.push('<title>FaBeautifierHtml</title>');
	result.push('<link href="./index.css" rel="stylesheet">');
	result.push('</head>');
	result.push('<body>');
	result.push(FaBeautifierHtml.beautify(test));
	result.push('</body>');
	result.push('</html>');
	// return result.join('');
	fs.writeFileSync('./test/sample/index.html', result.join(''));
}

/**/
const test = {
	myArr,
	myObj,
	myUnd: undefined,
	null: null,
	bool1: true,
	bool2: false,
	myReg,
	myDate,
	myStr,
	myMap,
	myWeakMap,
	myPromise,
	myArrayBuffer,
	myBuffer,
	// myFile: myFile,
	myFunc,
	// myFaError,
	myException,
	// jsonArray: myJsonArray,
	jsonObj: myJsonObj,
	// myXml,
	mongoId: new ObjectId
};
writeHtml(test);
/**/
// console.log(FaBeautifierConsole.beautify(myException));
// console.log(FaBeautifierConsole.beautify(myJson));
// console.log(FaBeautifierConsole.beautify(myXml));
// console.log(FaBeautifierConsole.beautify({ file: myFile.toString() }));
/**/
console.log(FaBeautifierConsole.beautify(test));
// console.log(FaBeautifierPlain.beautify(test));
// console.log(FaBeautifierJson.beautify(test));
// console.log(FaBeautifierHtml.beautify(test));


