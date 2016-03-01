"use strict";

const mediainfo = require('./lib/mediainfo');
const audio = require('./lib/audio');
const video = require('./lib/video');


module.exports = filepath => {
	return mediainfo(filepath).then(mi => {
		var model;

		switch(mi.General['Internet media type'].split('/')[0]){
			case 'audio':
				model = audio;
				break;

			case 'video':
				model = video;
				break;

			default:
				throw new Error('Not a media file');
		}

		return new model(filepath).processMediainfo(mi);
	});
};

module.exports.Audio = audio;
module.exports.Video = video;
module.exports.mediainfo = mediainfo;