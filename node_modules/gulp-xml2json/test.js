'use strict';
var fs = require('fs');
var assert = require('assert');
var gutil = require('gulp-util');
var xml2json = require('./index');

it('should convert xml to json', function (cb) {
	var stream = xml2json();
	stream.on('data', function (file) {
	var parse_str = JSON.parse(file.contents.toString('utf-8'));
		assert(parse_str instanceof Object);
		cb();
	});

	stream.write(new gutil.File({
		path: __dirname + '/sample/A_lvr_land_A.xml',
		contents: fs.readFileSync(__dirname + '/sample/A_lvr_land_A.xml')
	}));
});
