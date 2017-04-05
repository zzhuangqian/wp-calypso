/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import Main from 'components/main';
import Card from 'components/card';
import SectionHeader from 'components/section-header';

export default class Settings extends Component {

	render() {
		return (
			<Main className="woocommerce-product-addons__main">
				<SectionHeader label="WooCommerce Store Product Add-Ons" />
				<Card>
					<p>This is the start of something great!</p>
					<p>This will be the home for your WooCommerce Store Product Add-Ons global settings.</p>
				</Card>
			</Main>
		);
	}

}
