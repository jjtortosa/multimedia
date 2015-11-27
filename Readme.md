# multimedia 

Simple Multimedia helper Api

[![npm version](https://badge.fury.io/js/multimedia-helper.png)](http://badge.fury.io/js/multimedia-helper)
[![GitHub version](https://badge.fury.io/gh/jjtortosa%2Fmultimedia-helper.png)](http://badge.fury.io/gh/jjtortosa%2Fmultimedia-helper)

[![NPM](https://nodei.co/npm/multimedia-helper.png?downloads=true&downloadRank=true)](https://nodei.co/npm/multimedia-helper/) [![NPM](https://nodei.co/npm-dl/multimedia-helper.png?months=6&height=3)](https://nodei.co/npm/multimedia-helper/)

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install multimedia-helper --save
```

## Usage

var mm = require('multimedia-helper')

mm.mediainfo(filepath, function(err, mediainfo){
	assert.ifError(err);

	console.log(mediainfo);
});

Specify type:

mm.Video(filepath).info(function(err, info){
	assert.ifError(err);

	console.log(info);
});

mm.Audio(filepath).info(function(err, info){
	assert.ifError(err);

	console.log(info);
});


Detection:

mm(filepath, function(err, multimedia){
	assert.ifError(err);

	var info = multimedia.info();

	console.log(info);
});


## Issues

TODO


## Dependencies

None


## Dev Dependencies

None


## License

MIT
