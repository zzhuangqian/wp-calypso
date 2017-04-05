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
import ProductForm from './products/product-form';
import Dashboard from './dashboard';
import FoldableCard from 'components/foldable-card';

const pluggables = [
	{
		componentClass: 'FoldableCard',
		data: 'foo1',
		id: 1
	},
	{
		componentClass: 'FoldableCard',
		data: 'foo2',
		id: 2
	},
	{
		componentClass: 'FoldableCard',
		data: 'foo3',
		id: 3
	}
];

// TODO: Move this into pluggable to keep a reference of pluggable components there for React.createElement
window.extensionComponents = {
	FoldableCard: FoldableCard
};

const Controller = {
	dashboard: function( context ) {
		renderWithReduxStore(
			React.createElement( Dashboard, { } ),
			document.getElementById( 'primary' ),
			context.store
		);
	},

	addProduct: function( context ) {
		renderWithReduxStore(
			React.createElement( ProductForm, { pluggables: pluggables } ),
			document.getElementById( 'primary' ),
			context.store
		);
	}
};

export default function() {
	page( '/store/:site?', siteSelection, navigation, Controller.dashboard );
	page( '/store/:site?/products/add', siteSelection, navigation, Controller.addProduct );
}
