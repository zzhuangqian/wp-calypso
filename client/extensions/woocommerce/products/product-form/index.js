/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import i18n from 'i18n-calypso';

/**
 * Internal dependencies
 */
import FoldableCard from 'components/foldable-card';
import FormToggle from 'components/forms/form-toggle';
import Main from 'components/main';
import ProductVariationTypesForm from '../product-variation-types-form';
import SectionHeader from 'components/section-header';
import Pluggables from '../../pluggables';

export default class ProductForm extends Component {

	static propTypes = {
		product: PropTypes.shape( {
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
		} )
	};

	constructor( props ) {
		super( props );

		this.state = {
			isVariation: props.product && 'variable' === props.product.type ? true : false,
		};

		this.handleToggle = this.handleToggle.bind( this );
	}

	handleToggle() {
		this.setState( ( prevState ) => ( {
			isVariation: ! prevState.isVariation,
		} ) );
	}

	render() {
		const { product } = this.props;
		const variationToggleDescription = i18n.translate(
			'%(productName)s has variations, for example size and color.', {
				args: {
					productName: product && product.name || i18n.translate( 'This product' )
				}
			}
		);
		const pluggablesSection = Pluggables.render( 'product-form' );
		return (
			<Main className="product-form">
				<SectionHeader label="Add/Edit Product" />
				{ pluggablesSection }
				<FoldableCard
					icon=""
					expanded={ true }
					className="product-form__product-variations"
					header={ ( <FormToggle onChange={ this.handleToggle } checked={ this.state.isVariation }>
					{variationToggleDescription}
					</FormToggle>
					) }
				>
					{ this.state.isVariation && (
						<ProductVariationTypesForm />
					) }
				</FoldableCard>
			</Main>
		);
	}

}
