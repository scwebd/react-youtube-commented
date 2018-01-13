// Importing the JS utility library Lodash and mapping it to the
// character '_'. We're using it in this file to throttle/debounce the YouTube
// search so that it's only allowed to execute once every 700ms.
// Check out the documentation for TONS of other cool functionality: https://lodash.com/
// This is a great library to be familiar with!
import _ from 'lodash';

// Importing React, and breaking React.Component off into its own
// object that we can then reference with 'Component'.
import React, { Component } from 'react';

// Remember, we need ReactDOM as well on the main wrapper component
// only so that we can inject all of our content into the DOM.
import ReactDOM from 'react-dom';

// These are the components we created --- note the './directory' path
// that is necessary only for the imports we created ourselves.
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';

// Importing the NPM package to hit the YouTube API.
import YouTubeSearch from 'youtube-api-search';

// Just the API key.
const apiKey = 'AIzaSyDDXeVwdx9PwNFmTF88a7XFSL7-xp-iXyw';

// Our component here is stateful (as in it has its own state, seen
// below in the 'this.state' object. When a component is stateful,
// it follows the 'class Whatever extends Component' format and includes
// a constructor. A functional or stateless component will likely
// use the 'const Whatever = () =>' format. See video_detail.js
// for an example of a functional/stateless component.
class App extends Component {
	// The constructor creates/initializes your class.
	constructor(props) {
		// The line below allows you to use 'this.props' inside your
		// constructor... always include this inside your constructor.
		super(props);
		
		// The object below is where you set the initial states for
		// your React component. Note that the initial state is set
		// inside your constructor, so therefore these states are set
		// when the component is first initialized. These can and will
		// be overwritten later.
		this.state = {
			videos: [],
			selectedVideo: null
		}

		// On this line, we're calling the runSearch method that
		// lives below. In order to call the method, we need to use
		// 'this.runSearch' -- this is so that our constructor is
		// able to find the runSearch method. Note that we're running 
		// this initial search (and passing in a static search term)
		// AFTER we create our initial state values, but still within 
		// the constructor.
		this.runSearch("minions");
	}

	// Below, we're creating a method inside of our class. Note
	// that we created it outside of the constructor AND outside of
	// the render(). We can access this method inside of our class/
	// component. We will also be able to access this method in our
	// other components if we pass it into other components as a prop.
	// This method expects that a search term (a string) will be passed
	// in. It uses that search term to run the search against the YouTube
	// Search API. FYI: At this point, we're only creating this method
	// here, not calling it.
	runSearch(term) {

		// The syntax below is specific to using the 'youtube-api-search' 
		// NPM package. The key takeaway is that we're calling the package
		// and passing it our API key and a search term... then, we're 
		// naming whatever we get back from the search as 'videos'.
		YouTubeSearch({ key: apiKey, term: term }, videos => {
		    console.log(videos);

		    // Here we're taking the search results and updating the
		    // component's state in response. We're taking the videos 
		    // object (an array of 5 videos we get back from the search) 
		    // and passing them as the value of state 'videos'. Then, we're 
		    // setting the value of state 'selectedVideo' to be equal to 
		    // the first video in that same array of videos we got back from 
		    // our YouTube search.
		    this.setState({
		    	videos: videos,
		    	selectedVideo: videos[0]
		    });
		});
	}

	// Since this is a 'stateful' component, we wrap our return in a
	// render method. We also make sure we call this render OUTSIDE
	// of the constructor, but inside of the main class/component.
	render() {
		// This line is where we essentially hook up our awesome
		// runSearch method (see above) to the Lodash (_) debounce
		// method. We created a new const (runSearchThrottled). 
		// In that const, we call Lodash/_.debounce. It expects
		// an argument (a search term). Then, we tell it what to do
		// with that search term -- namely, run this.runSearch and pass
		// in the search term. THEN, after the closing curly bracket, note
		// that we're passing it a number. That value is the number of 
		// milliseconds to delay/wait after the function is called before
		// allowing it to execute again: https://lodash.com/docs/4.17.4#debounce
		const runSearchThrottled = _.debounce((term) => {this.runSearch(term)}, 700);

		return (
			// Remember that React demands that we wrap all of our
			// components and HTML inside of a wrapper element of some
			// sort. Hence the div below wrapping all of our components.
			
			// For components below, note that we're passing values in as 
			// props to each component. The part on the left of the equal 
			// sign is the name we'll use to reference that particular value 
			// inside the child component. The part on the right/between 
			// curly brackets is the value we want to set that prop to.
	
			// In the tag for SearchBar below, notice that, when we
			// pass it prop 'onSearchTermChange', we're setting that value
			// to point to runSearchThrottled rather than this.runSearch.
			// This is because runSearchThrottled is basically a new version
			// of runSearch with throttling built in! Badass!

			// In the tag for the VideoList component (see below), note the syntax for the
			// prop 'onVideoSelect'. We're creating this and passing it to the VideoList
			// component so that the videoList can pass us back a value for selectedVideo 
			// (basically, we want it to pass us the video object corresponding to
			// whichever video list item the user clicked on.) Then, we take that video
			// object, and set this component's 'selectedVideo' state to be equal
			// to that object.
			<div>
				<SearchBar onSearchTermChange={runSearchThrottled} />
				<VideoDetail selectedVideo={this.state.selectedVideo} />  
				<VideoList videos={this.state.videos} onVideoSelect={selectedVideo => this.setState({ selectedVideo: selectedVideo })} />
			</div>

		);
	}
}

// In ReactDOM.render, note that the first parameter we pass is the
// component or HTML we want to render (in this case it's a component)
// and the second parameter is the place on our index.html where we 
// want to insert all of our React-generated content.
ReactDOM.render(<App />, document.getElementById("main-content"));