// External dependencies
import React from 'react';

// Internal dependencies
import CompactCard from 'components/card/compact';

class StepOne extends React.Component {
	render() {
		return (
			<div>
				<h1 className="set-up-site__heading">
					What kind of site are you creating?
				</h1>

				<div className="set-up-site__site-types">
					<CompactCard href="/set-up-site/two">Restaurant</CompactCard>
					<CompactCard href="/set-up-site">Health & Wellness</CompactCard>
					<CompactCard href="/set-up-site">Professional Service</CompactCard>
					<CompactCard href="/set-up-site">Online Store</CompactCard>
					<CompactCard href="/set-up-site">Other Business</CompactCard>
					<CompactCard href="/set-up-site">Personal Site or Blog</CompactCard>
					<CompactCard href="/set-up-site">Other</CompactCard>
				</div>
			</div>
		);
	}
}

export default StepOne;
