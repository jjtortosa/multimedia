
function Media(filepath, cb){
	Media.madiainfo(filepath, function(err, mi){
		if(err)
			return cb(err);
		
		var model;
		
		switch(mi['Internet media type'].split('/')[0]){
			case 'audio':
				model = Media.Audio;
				break;
				
			case 'video':
				model = Media.Video;
				break;
				
			default:
				return cb(new Error('Not a media file'));
		}
		
		return model(filepath).processMediainfo(mi);
	});
}

Media.Audio = require('./lib/audio');
Media.Video = require('./lib/video');
Media.madiainfo = require('./lib/madiainfo');

module.exports = Media;