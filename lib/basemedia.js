"use strict";

const mediainfo = require("../lib/mediainfo").exec;
const path = require('path');

class BaseMedia {
	constructor(filepath) {
		this.filepath = filepath;
		this.filename = path.basename(filepath);
	}

	//noinspection JSUnusedGlobalSymbols
	info() {
		if (this.metadata)
			return Promise.resolve(this.metadata);

		return mediainfo(this.filepath).then(this.processMediainfo.bind(this));
	}

	processMediainfo(r, extra) {
		this.metadata = {
			title: r.General['Complete name'] || this.filename,
			contentType: r.General['Internet media type']
		};

		extra && Object.each(extra, (k, v) => this.metadata[k] = v[k]);

		return this.metadata;
	}
}

module.exports = BaseMedia;