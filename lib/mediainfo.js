"use strict";

var exec = require("child_process").exec;

module.exports = function(filepath){
	return new Promise((ok, ko) => {
		exec('mediainfo -f "' + filepath + '"', function(err, stdout, stderr) {
			if (err || stderr) return ko(err || stderr);

			ok(parse(stdout));
		});
	});
};

function parse(md){
	var parts = md.split(/\n\n/)
	,	ret = {};

	parts.forEach(function(part){
		var lines = part.split('\n')
		,	section = lines.shift();

		ret[section] = {};

		lines.forEach(function(line){
			var s = line.match(/^(.+)\s+:\s(.+)$/);

			if(!s) return;

			var k = s[1].trim();

			//Only parse the first item with the same key
			//Always is the primary value
			
			if(ret[section][k]) return;

			ret[section][k] = isNaN(s[2]) ? s[2] : parseFloat(s[2]);
		});
	});

	return ret;
}