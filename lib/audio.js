"use strict";

const BaseMedia = require("./basemedia");

class Audio extends BaseMedia{

	processMediainfo(r) {
		super.processMediainfo(r, {
			title: r.General['Complete name'] || this.filename,
			contentType: r.General['Internet media type'],
			duration: r.General.Duration / 1000,
			bitrate: r.General['Overall bit rate'],
			sampleRate: r.Audio['Sampling rate'],
			codec: r.Audio.Codec || r.Audio.Format || '',
			channels: r.Audio['Channel(s)']
		});

		return this.metadata;
	}
}

module.exports = Audio;