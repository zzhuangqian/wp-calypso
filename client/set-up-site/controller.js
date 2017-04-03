// External dependencies
import React from 'react';
import ReactDom from 'react-dom';
import SetUpSite from './set-up-site';

// Internal dependencies
import { renderWithReduxStore } from 'lib/react-helpers';

export const setUp = ( context ) => {
	renderWithReduxStore(
		<SetUpSite step={ context.params.step } />,
		'primary',
		context.store
	);

	ReactDom.unmountComponentAtNode( document.getElementById( 'secondary' ) );
};
