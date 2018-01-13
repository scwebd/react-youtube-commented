import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
	return (
		<li onClick={() => onVideoSelect(video)}>
			<img src={video.snippet.thumbnails.default.url} />
		</li>
	);
};

export default VideoListItem;