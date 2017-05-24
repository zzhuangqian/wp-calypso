/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';
import Gridicon from 'gridicons';
import { head, uniqueId } from 'lodash';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import DropZone from 'components/drop-zone';
import FormLabel from 'components/forms/form-label';
import FilePicker from 'components/file-picker';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import ImagePreloader from 'components/image-preloader';
import MediaActions from 'lib/media/actions';
import MediaUtils from 'lib/media/utils';
import MediaStore from 'lib/media/store';
import Spinner from 'components/spinner';

import { errorNotice as errorNoticeAction } from 'state/notices/actions';

class ProductFormImages extends Component {
	// TODO Shape of product
	static propTypes = {
		product: PropTypes.object.isRequired,
		editProduct: PropTypes.func.isRequired,
		siteId: PropTypes.number,
	};

	state = {
		isUploading: false,
		previews: [],
		placeholders: [],
	};

	onPick = ( files ) => {
		const { product, editProduct, translate, siteId, errorNotice } = this.props;
		const productImages = product.images && [ ...product.images ] || [];

		// DropZone supplies an array, FilePicker supplies a FileList
		const images = Array.isArray( files ) ? MediaUtils.filterItemsByMimePrefix( files, 'image' ) : [ ...files ];
		if ( ! images ) {
			return false;
		}

		const transientIds = [];
		const filesToUpload = [];
		const previews = [];
		const previewByTransientId = [];

		images.forEach( function( image ) {
			const transientId = uniqueId( 'product-images' );
			const preview = URL.createObjectURL( image );

			transientIds.push( transientId );
			previews.push( preview );
			filesToUpload.push( {
				ID: transientId,
				fileContents: image,
				fileName: image.name,
			} );
			previewByTransientId[ transientId ] = preview;
		} );

		this.setState( {
			isUploading: true,
			previews,
			placeholders: [],
		} );

		const placeholders = [];
		const handleUpload = () => {
			const transientId = head( transientIds );
			const media = MediaStore.get( siteId, transientId );
			const isUploadInProgress = media && MediaUtils.isItemBeingUploaded( media );

			// File has finished uploading or failed.
			if ( ! isUploadInProgress ) {
				transientIds.shift();
				if ( media ) {
					// TODO: Other fields here?
					productImages.push( {
						src: media.URL
					} );
					placeholders[ media.URL ] = previewByTransientId[ transientId ];
					previews.shift();
					this.setState( {
						previews,
						placeholders,
					} );
					editProduct( product, { images: productImages } );
				} else {
					errorNotice( translate( 'There was a problem uploading %s.', {
						args: media && media.file || translate( 'a product image' )
					} ) );
				}

				// All images have been uploaded.
				if ( transientIds.length === 0 ) {
					this.setState( {
						isUploading: false,
					} );
					MediaStore.off( 'change', handleUpload );
				}
			}
		};

		MediaStore.on( 'change', handleUpload );
		MediaActions.add( siteId, filesToUpload );
	}

	removeImage = ( index ) => {
		const { product, editProduct } = this.props;
		const images = product.images && [ ...product.images ] || [];
		images.splice( index, 1 );
		editProduct( product, { images } );
	}

	render() {
		const { product, translate } = this.props;
		const { isUploading, previews, placeholders } = this.state;

		// An image with id 0 is a placeholder image.
		const images = product.images && product.images.filter( i => i.id !== 0 ) || [];

		return (
			<div className="products__product-form-images-wrapper">

				<FormLabel>{ translate( 'Product Images' ) }</FormLabel>

				{ images.length === 0 && ! isUploading && (
					<div className="products__product-form-images-placeholder">
						<div>
							<div className="products__product-form-images-picker">
								<FilePicker multiple accept="image/*" onPick={ this.onPick }>
									<Gridicon icon="add-outline" size={ 36 } />
									<p>{ translate( 'Add images' ) }</p>
								</FilePicker>
							</div>
							<DropZone onFilesDrop={ this.onPick } />
						</div>
					</div>
				) }

				<div className="products__product-form-images">
					{ images.map( ( image, index ) => {
						const removeImage = () => {
							this.removeImage( index );
						};
						return (
							<div className="products__product-form-images-item" key={ index }>
								<figure>
									<ImagePreloader
										src={ image.src }
										placeholder={ ( <img src={ placeholders[ image.src ] } /> ) }
									/>
								</figure>
								<Button
									onClick={ removeImage }
									compact
									className="products__product-form-images-item-remove">
									<Gridicon
										icon="cross"
										size={ 24 }
										className="products__product-form-images-item-remove-icon"
									/>
								</Button>
							</div>
						);
					} ) }
					{ previews && previews.map( function( preview, index ) {
						return (
							<div className="products__product-form-images-item preview" key={ 'preview-' + index }>
								<figure>
									<img src={ preview } />
									<Spinner />
								</figure>
							</div>
						);
					} ) }

					{ ( images.length > 0 || previews.length > 0 ) && ! isUploading && (
						<div className="products__product-form-images-picker compact">
							<FilePicker multiple accept="image/*" onPick={ this.onPick } >
								<Gridicon icon="add-outline" size={ 24 } />
							</FilePicker>
						</div>
					) }
				</div>

				{ /* TODO: Component Cleanup/Breakup: Part of this can be trying to make multiple uploads / concurrent uploading work.
					Perhaps we have a <ProductImagePicker /> component, with an onSelect prop that returns
					a list of previews based on selected files, and an onUpload that returns when a file has finished uploading.
					If we can keep track of these, we could keep the preview and image area separate from the uploading process
					and also allow concurrent uploading. This would also allow us to use shared code for variations..
					maybe have only a singleUpload prop as well for that..
				 */ }
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

export default connect( null, { errorNotice: errorNoticeAction } )( localize( ProductFormImages ) );
