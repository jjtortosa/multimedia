/* global module */

"use strict";

const mediainfo = require("../lib/mediainfo").exe;
const path = require('path');

class Video {
	constructor(filepath) {
		this.filepath = filepath;

		Object.defineProperty(this, 'filename', {
			get: function () {
				return path.basename(this.filepath);
			}
		});
	}

	info(cb) {
		return new Promise((ok, ko) => {
			if (this.metadata)
				return ok(this.metadata);

			return mediainfo(this.filepath).then(this.processMediainfo.bind(this));
		});
	}

	processMediainfo(r) {
		this.metadata = {
			title: r.General['Complete name'] || this.filename,
			contentType: r.General['Internet media type'],
			width: r.Video.Width,
			height: r.Video.Height,
			duration: r.Video.Duration / 1000,
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

		return this.metadata;
	}
}

module.exports = Video;