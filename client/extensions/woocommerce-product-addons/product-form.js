/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import FoldableCard from 'components/foldable-card';

export default class ProductFormProductAddons extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		return (
			<FoldableCard
				className="woocommerce-product-addons__product-form"
				header="Product Add-Ons"
				expanded={ true }
			>
				addons would go here
			</FoldableCard>
		);
	}
}
