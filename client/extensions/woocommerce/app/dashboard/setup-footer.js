/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Button from 'components/button';

const SetupFooter = ( { label, onClick } ) => {
	return (
		<div className="dashboard__setup-footer">
			<Button onClick={ onClick }>{ label }</Button>
		</div>
	);
};

SetupFooter.propTypes = {
	label: React.PropTypes.string.isRequired,
	onClick: React.PropTypes.func.isRequired,
};

export default SetupFooter;
