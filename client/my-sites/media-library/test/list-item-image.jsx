/**
 * External dependencies
 */
import { expect } from 'chai';
import React from 'react';

/**
 * Internal dependencies
 */
import useFakeDom from 'test/helpers/use-fake-dom';
import useMockery from 'test/helpers/use-mockery';
import photon from 'photon';
import resize from 'lib/resize-image-url';
import MediaLibraryListItemImage from 'my-sites/media-library/list-item-image';

const MAX_WIDTH = 450;

const MEDIA_ITEM = {
	URL: 'http://example.files.wordpress.com/2015/05/g1009.gif'
};

const getComponent = type => <MediaLibraryListItemImage
								media={ MEDIA_ITEM }
								scale={ 1 }
								maxImageWidth={ MAX_WIDTH }
								thumbnailType={ type } />;

describe( 'MediaLibraryListItem image', function() {
	let shallow, wrapper;

	useFakeDom();
	useMockery();

	before( function() {
		shallow = require( 'enzyme' ).shallow;
	} );

	beforeEach( function() {
		if ( wrapper ) {
			wrapper.unmount();
		}
	} );

	context( 'thumbnail display mode', function() {
		it( 'defaults to photon', function() {
			wrapper = shallow( getComponent() );

			expect( wrapper.props().src ).to.be.equal( photon( MEDIA_ITEM.URL, { width: MAX_WIDTH } ) );
		} );

		it( 'returns a photon thumbnail for type MEDIA_IMAGE_PHOTON', function() {
			wrapper = shallow( getComponent( 'MEDIA_IMAGE_PHOTON' ) );

			expect( wrapper.props().src ).to.be.equal( photon( MEDIA_ITEM.URL, { width: MAX_WIDTH } ) );
		} );

		it( 'returns a resized private thumbnail for type MEDIA_IMAGE_RESIZER', function() {
			wrapper = shallow( getComponent( 'MEDIA_IMAGE_RESIZER' ) );

			expect( wrapper.props().src ).to.be.equal( resize( MEDIA_ITEM.URL, { w: MAX_WIDTH } ) );
		} );
	} );
} );
