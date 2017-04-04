// External dependencies
import React from 'react';

// Internal dependencies

class StepThree extends React.Component {
	constructor( props ) {
		super( props );

		setTimeout( () => {
			document.location = 'https://coffeeshopdemosite123.wordpress.com';
		}, 3000 );
	}

	render() {
		return (
			<div className="sup">
				<div />
				<h1>We're building your site now.</h1>
				<h2>Give us one minute while we create a beautiful site for you.</h2>
			</div>
		);
	}
}

export default StepThree;
