/* global module */
"use strict";

var mediainfo = require("../lib/mediainfo").exec
,	path = require('path');

class Audio {
	constructor(filename) {
		this.filename = filename;

		Object.defineProperty(this, 'filename', {
			get: function () {
				return path.basename(this.filepath);
			}
		});
	}

	info() {
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
			duration: r.General.Duration / 1000,
			bitrate: r.General['Overall bit rate'],
			sampleRate: r.Audio['Sampling rate'],
			codec: r.Audio.Codec || r.Audio.Format || '',
			channels: r.Audio['Channel(s)']
		};

		return this.metadata;
	}
}

module.exports = Audio;