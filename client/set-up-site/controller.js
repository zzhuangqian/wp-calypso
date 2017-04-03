// External dependencies
import React from 'react';
import SetUpSite from './set-up-site';

// Internal dependencies
import { renderWithReduxStore } from 'lib/react-helpers';

export const start = ( context ) => {
	renderWithReduxStore(
		<SetUpSite step={ context.params.step } />,
		'primary',
		context.store
	);
};
