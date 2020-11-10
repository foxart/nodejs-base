module.exports = JSON.stringify({
	'myArr': [
		1,
		[
			21,
			[
				2.21,
				[],
				2.23
			],
			22
		],
		3
	],
	'myReg': '/(?:\\d{3}|\\(\\d{3}\\))([-\\/\\.])\\d{3}\\1\\d{4}/',
	'myDate': '2020-01-16T16:11:02.763Z',
	'myStr': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book.\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	'undefined': 'undefined',
	'null': null,
	'bool1': true,
	'bool2': false,
	'mongoId': '5e208b1675cf8b62711bc419',
	'myMap': '[object Map]',
	'myWeakMap': '[object WeakMap]',
	'myArrayBuffer': '[object ArrayBuffer]',
	'myBuffer': {
		'type': 'Buffer',
		'data': [
			1,
			3,
			7
		]
	},
	'myFunc': 'function map(f, a) {\n\tconst result = []; \/\/ Create a new Array\n\tlet i;\n\tfor (i = 0; i !== a.length; i++) {\n\t\tresult[i] = f(a[i]);\n\t}\n\treturn result;\n}',
	'myPromise': '[object Promise]',
	'myErr': {
		'<FaError> my error': [
			'Object.<anonymous> \/c\/www\/fa-nodejs\/beautifier\/test\/index.js:47:15',
			'Module._compile internal\/modules\/cjs\/loader.js:956:30',
			'Object.Module._extensions..js internal\/modules\/cjs\/loader.js:973:10',
			'Module.load internal\/modules\/cjs\/loader.js:812:32',
			'Function.Module._load internal\/modules\/cjs\/loader.js:724:14',
			'Function.Module.runMain internal\/modules\/cjs\/loader.js:1025:10',
			'null internal\/main\/run_main_module.js:17:11'
		]
	},
	'myExc': {
		'<Error> ReferenceError: a is not defined': [
			'Object.<anonymous> \/c\/www\/fa-nodejs\/beautifier\/test\/index.js:54:10',
			'Module._compile internal\/modules\/cjs\/loader.js:956:30',
			'Object.Module._extensions..js internal\/modules\/cjs\/loader.js:973:10',
			'Module.load internal\/modules\/cjs\/loader.js:812:32',
			'Function.Module._load internal\/modules\/cjs\/loader.js:724:14',
			'Function.Module.runMain internal\/modules\/cjs\/loader.js:1025:10',
			'null internal\/main\/run_main_module.js:17:11'
		]
	}
});
