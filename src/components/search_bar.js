// Remember that we always need to import React for all of our
// components. Even though React isn't being called explicitly 
// within a component like this, we know that 'React.createElement'
// is being called under the hood. If you need a refresher on this,
// paste the whole 'const SearchBar' chunk into 
// 'https://babeljs.io/repl/' for a reminder.
import React, {Component} from 'react';

// Initially, we had this as a stateless component, but we decided
// to convert it to a stateful component (class-based) so that 
// we could set and manage state for a search term ('term').
class SearchBar extends Component {
	// As always in a stateful component, we use a constructor
	// here and pass in props, and then we also pass props into
	// super.
	constructor(props) {
		super(props);

		// We also set our initial state inside the constructor.
		// In this case, we're just setting the state of 'term'
		// to an empty string. We'll alter this state once the 
		// user types something in the search field.
		this.state = { term: "" };
	}

	// Here, we're creating a new method. This method, when called,
	// will take in a search term. 
	onInputChange(term) {
		// It will take that search term (a string) and set the 
		// component's state 'term' equal to the search term.
		this.setState({ term: term });

		// On the second line of this method, we're running the method
		// 'onSearchTermChange' (which was passed in from index.js via
		// the props. Note that 'onSearchTermChange' is the throttled/
		// debounced version of the runSearch method in index.js.
		// We're passing in a value (a new search term) by grabbing
		// the state 'term', which is equal to the most recent search
		// term.
		this.props.onSearchTermChange(this.state.term);
	}

	render() {
		return (
			<div className="search-bar col-md-12">
				<input 
					type="text" 
					placeholder="text here" 
					value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)}
					/>
			</div>
		);
	}

}

// Gotta export it so that it can be rendered on the index.js!
export default SearchBar;
