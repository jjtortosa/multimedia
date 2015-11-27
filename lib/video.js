/* global module */

var mediainfo = require("../lib/mediainfo").exec
,	path = require('path');

function Video(filepath) {
	if(!(this instanceof Video))
		return new Video(filepath);
	
	this.filepath = filepath;
	
	Object.defineProperty(this, 'filename', {
		get: function(){
			return path.basename(this.filepath);
		}
	});
}

Video.prototype.info = function(cb){
	if(this.metadata)
		return cb.call(this, null, this.metadata);
	
	mediainfo(this.filepath, this._processMediainfo.bind(this));
};

Video.prototype.processMediainfo = function(r){
	this.metadata = {
		title: r.General['Complete name'] || this.filename,
		contentType: r.General['Internet media type'],
		width: r.Video.Width,
		height: r.Video.Height,
		duration: r.Video.Duration,
		fps: r.Video['Frame rate'] || 'Variable',
		frameCount: r.Video['Frame count'],
		bitrate: r.General['Overall bit rate'],
		videoBitrate: r.Video['Bit rate'] || 'Variable',
		audioBitrate: r.Audio && r.Audio['Bit rate'] || '',
		audioSampleRate: r.Audio && r.Audio['Sampling rate'] || '',
		videoCodec: r.Video['Codec ID'] === 'avc1' ? 'h264' : r.Video['Codec ID'],
		audioCodec: r.Audio && r.Audio.Format || '',
		audioChannels: r.Audio && r.Audio['Channel(s)'] || ''
	};
	
	return this;
};

module.exports = Video;