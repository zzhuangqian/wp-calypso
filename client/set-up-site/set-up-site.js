// External dependencies
import React from 'react';

// Internal dependencies
import Button from 'components/button';
import Main from 'components/main';
import StepOne from './step-one';
import StepTwo from './step-two';
import StepThree from './step-three';

class SetUpSite extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		const components = {
			one: StepOne,
			two: StepTwo,
			three: StepThree,
		};

		const Component = components[ this.props.step ? this.props.step : 'one' ];

		return (
			<Main className="set-up-site">
				<Component />
			</Main>
		);
	}
}

export default SetUpSite;
