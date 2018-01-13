import React from 'react';

// See that '{selectedVideo}' passed into our parens as an parameter.
// That syntax essentially means that we want to take whatever is being
// passed in from the parent component (index.js) which by definition
// is an object of props. We're basically saying we want to pull off
// props.selectedVideo into its own object, 'selectedVideo'. After we
// do that we can then reference that object within our const simply
// as 'selectedVideo'. Thanks for the cool functionality, ES6!
const VideoDetail = ({selectedVideo}) => {
	// What we're doing here is handling the case when the selectedVideo
	// doesn't yet exist. This would apply when 'selectedVideo' is still
	// set to null. You can see this in the initial 'this.state' object
	// inside of the constructor in index.js. As soon as the initial 
	// search is completed (right below the 'this.state' object in
	// index.js, the selectedVideo state will be updated with an actual
	// video, and React will reload this component in response to the
	// state change, and will display our glorious video!
	if (!selectedVideo) {
		return <div className="col-md-8">Loading...</div>
	}

	// Note that these consts and the return below will only happen
	// IF a selectedVideo exists, else we'll get the loading div above.
	const selectedVideoId = selectedVideo.id.videoId;
	// The '${whatever}' syntax in the next line is also thanks to
	// ES6, and lets us create strings combined with variables/JS
	// in a more elegant way. If we'd done it the ES5 way, here's 
	// what it'd look like:
	// const selectedVideoUrl = 'https://www.youtube.com/embed/" + selectedVideoId;
	const selectedVideoUrl = `https://www.youtube.com/embed/${selectedVideoId}`;

	return (
		<div className="video-detail col-md-8">
			<div>
				<iframe src={selectedVideoUrl}></iframe>
			</div>
			<div>
				<p>{selectedVideo.snippet.title}</p>
				<p>{selectedVideo.snippet.description}</p>
			</div>
		</div>
	);
};

export default VideoDetail;