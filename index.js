
function Media(filepath, cb){
	Media.mediainfo(filepath, function(err, mi){
		if(err)
			return cb(err);
		
		var model;
		
		switch(mi.General['Internet media type'].split('/')[0]){
			case 'audio':
				model = Media.Audio;
				break;
				
			case 'video':
				model = Media.Video;
				break;
				
			default:
				return cb();//new Error('Not a media file'));
		}
		
		cb(null, model(filepath).processMediainfo(mi));
	});
}

Media.Audio = require('./lib/audio');
Media.Video = require('./lib/video');
Media.mediainfo = require('./lib/mediainfo');

module.exports = Media;