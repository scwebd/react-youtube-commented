import React from 'react';
// Note how we're importing another component inside of this 
// component. Since we're importing and calling VideoListItem directly
// inside of this current component, we don't need to import it inside
// of index.js at all.
import VideoListItem from './video_list_item';

// Once again, we're breaking props.videos off into its own object,
// which we can then reference using 'videos'. Note that the names 
// passed in here as parameters MUST match the names to the left of
// the equal sign when the component is initially referenced in the
// parent component (in this case, index.js).
const VideoList = ({videos, onVideoSelect}) => {
	// Add loading icon/text if video/data doesn't yet exist
	if (!videos) {
		return <div className="col-md-4">Loading...</div>
	}

	// Creating a const to take the array of videos, and map through
	// it. The map basically says that, for each individual video, 
	// the page should return one instance of a VideoListItem component,
	// and give it a 'key' (React's way to uniquely identify this particular
	// member of the array) and a 'video' -- which is the object which
	// corresponds to the individual video we want each thumbnail to
	// correspond to.
	const activeVideos = videos.map(video => {
		return (
			<VideoListItem 
				key={video.id.videoId} 
				video={video} 
				onVideoSelect={onVideoSelect}
			/>
		)
	});

	// Below, we're creating a simple unordered list below, and within
	// the curly brackets, we're rendering the const activeVideos that
	// we created above.
	return (
		<ul className="video-list col-md-4">
			{activeVideos}
		</ul>
	);
};

export default VideoList;