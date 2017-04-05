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
import { register } from '../woocommerce/pluggables';
import ProductFormProductAddons from './product-form';

const Controller = {
	settings: function( context ) {
		renderWithReduxStore(
			React.createElement( Settings, { } ),
			document.getElementById( 'primary' ),
			context.store
		);
	}
};

export default function() {
	page( '/store/:site?/product-add-ons', siteSelection, navigation, Controller.settings );
}

register( 'product-form', ProductFormProductAddons );
