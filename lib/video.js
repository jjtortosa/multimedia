"use strict";

const BaseMedia = require("./basemedia");

class Video extends BaseMedia{

	processMediainfo(r) {
		super.processMediainfo(r, {
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
		});

		return this.metadata;
	}
}

module.exports = Video;