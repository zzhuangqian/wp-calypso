/**
 * External dependencies
 */
import React from 'react';
import page from 'page';

/**
 * Internal dependencies
 */
import { navigation, siteSelection } from 'my-sites/controller';
import { renderWithReduxStore } from 'lib/react-helpers';
import Settings from './settings';

const Controller = {
	settings: function( context ) {
		renderWithReduxStore(
			React.createElement( Settings, { } ),
			document.getElementById( 'primary' ),
			context.store
		);
	}
};

// TODO - we need a way to push/expose our pluggable section providing objects

export default function() {
	page( '/store/:site?/product-add-ons', siteSelection, navigation, Controller.settings );
}
