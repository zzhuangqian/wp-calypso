// External dependencies
import React from 'react';

// Internal dependencies
import Main from 'components/main';
import StepOne from './step-one';

class SetUpSite extends React.Component {
	constructor( props ) {
		super( props );
	}

	render() {
		const components = {
			one: StepOne
		};

		const Component = components[ this.props.step ];

		return (
			<Main className="step-one__content">
				<Component />
			</Main>
		);
	}
}

export default SetUpSite;
