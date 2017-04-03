// External dependencies
import React from 'react';

// Internal dependencies
import CompactCard from 'components/card/compact';

class StepOne extends React.Component {
	render() {
		return (
			<div>
				<h1>Step One</h1>

				<div>
					<CompactCard href="/set-up-site/two">Business</CompactCard>
					<CompactCard>Leisure</CompactCard>
					<CompactCard>Others</CompactCard>
				</div>
			</div>
		);
	}
}

export default StepOne;
