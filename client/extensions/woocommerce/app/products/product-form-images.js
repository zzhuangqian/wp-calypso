/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';
import { find } from 'lodash';

/**
 * Internal dependencies
 */
import FormLabel from 'components/forms/form-label';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import ImagePreloader from 'components/image-preloader';
import ProductImageUploader from '../../components/product-image-uploader';
import Spinner from 'components/spinner';

class ProductFormImages extends Component {
	// TODO Shape of product
	static propTypes = {
		product: PropTypes.object.isRequired,
		editProduct: PropTypes.func.isRequired,
		siteId: PropTypes.number,
	};

	constructor( props ) {
		super( props );

		const { product } = this.props;

		// An image with an id 0 is a WooCommerce placeholder image.
		const images = product.images && product.images.filter( i => i.id !== 0 ) || [];

		this.state = {
			images,
		};
	}

	onUpload = ( file ) => {
		const { product, editProduct } = this.props;
		const images = product.images && [ ...product.images ] || [];
		images.push( {
			id: file.ID,
			src: file.URL,
		} );
		editProduct( product, { images } );

		const stateImages = [ ...this.state.images ].map( ( i ) => {
			if ( i.transientId === file.transientId ) {
				return { ...i, src: file.URL, placeholder: null };
			}
			return i;
		} );

		this.setState( {
			images: stateImages,
		} );
	}

	onSelect = ( previews ) => {
		const { images } = this.state;
		const newImages = Object.entries( previews ).map( ( [ transientId, src ] ) => {
			return { placeholder: src, transientId };
		} );
		this.setState( {
			images: [ ...images, ...newImages ],
		} );
	}

	onError = ( file ) => {
		console.log( file );
	}

	onFinish = ( ids ) => {
		console.log( 'done!' );
		console.log( ids );
	}

	removeImage = ( index ) => {
		const { product, editProduct } = this.props;
		const images = product.images && [ ...product.images ] || [];
		images.splice( index, 1 );
		editProduct( product, { images } );
		// TODO Remove image from state too.
	}

	render() {
		const { translate, siteId } = this.props;
		const { images } = this.state;

		return (
			<div className="products__product-form-images-wrapper">

				<FormLabel>{ translate( 'Product Images' ) }</FormLabel>

				<ProductImageUploader
					onSelect={ this.onSelect }
					onUpload={ this.onUpload }
					onError={ this.onError }
					onFinish={ this.onFinish }
					siteId={ siteId }
				/>

				{ /* TODO: Image preview and display */ }
				{ /* TODO: CSS Layout */ }
				{ /* TODO: Review */ }
				{ /* TODO: Variations will be a different control... */ }

				<FormSettingExplanation>{ translate(
					'For best results, upload photos larger than 1000x1000px.'
				) }</FormSettingExplanation>
			</div>
		);
	}
}

export default localize( ProductFormImages );
