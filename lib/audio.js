/* global module */

var mediainfo = require("../lib/mediainfo").exec
,	path = require('path');

function Audio(filename) {
	if(!(this instanceof Audio))
		return new Audio(filename);
	
	this.filename = filename;
	
	Object.defineProperty(this, 'filename', {
		get: function(){
			return path.basename(this.filepath);
		}
	});
}

Audio.prototype.info = function(cb){
	if(this.metadata)
		return cb.call(this, null, this.metadata);
	
	mediainfo(this.filepath, this._processMediainfo.bind(this));
};

Audio.prototype.processMediainfo = function(r){
	this.metadata = {
		title: r.General['Complete name'] || this.filename,
		contenType: r.General['Internet media type'],
		duration: r.General.Duration,
		bitrate: r.General['Overall bit rate'],
		sampleRate: r.Audio['Sampling rate'],
		codec: r.Audio.Codec || r.Audio.Format || '',
		channels: r.Audio['Channel(s)']
	};
	
	return this;
};

module.exports = Audio;