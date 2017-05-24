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

describe( 'MediaLibraryListItem image', function() {
	let shallow, wrapper, fixtures;

	useFakeDom();
	useMockery();

	before( function() {
		shallow = require( 'enzyme' ).shallow;
		fixtures = require( './fixtures' );
	} );

	beforeEach( function() {
		if ( wrapper ) {
			wrapper.unmount();
		}
	} );

	const getComponent = ( itemPos, type ) => <MediaLibraryListItemImage
													media={ fixtures.media[ itemPos ] }
													scale={ 1 }
													maxImageWidth={ MAX_WIDTH }
													thumbnailType={ type } />;

	context( 'thumbnail display mode', function() {
		it( 'defaults to photon', function() {
			wrapper = shallow( getComponent( 0 ) );

			expect( wrapper.props().src ).to.be.equal( photon( fixtures.media[ 0 ].URL, { width: MAX_WIDTH } ) );
		} );

		it( 'returns a photon thumbnail for type MEDIA_IMAGE_PHOTON', function() {
			wrapper = shallow( getComponent( 0, 'MEDIA_IMAGE_PHOTON' ) );

			expect( wrapper.props().src ).to.be.equal( photon( fixtures.media[ 0 ].URL, { width: MAX_WIDTH } ) );
		} );

		it( 'returns a resized private thumbnail for type MEDIA_IMAGE_RESIZER', function() {
			wrapper = shallow( getComponent( 0, 'MEDIA_IMAGE_RESIZER' ) );

			expect( wrapper.props().src ).to.be.equal( resize( fixtures.media[ 0 ].URL, { w: MAX_WIDTH } ) );
		} );

		it( 'returns a medium thumbnail for type MEDIA_IMAGE_THUMBNAIL', function() {
			wrapper = shallow( getComponent( 0, 'MEDIA_IMAGE_THUMBNAIL' ) );

			expect( wrapper.props().src ).to.be.equal( fixtures.media[ 0 ].thumbnails.medium );
		} );

		it( 'returns resized thumbnail for type MEDIA_IMAGE_THUMBNAIL when no medium thumbnail', function() {
			wrapper = shallow( getComponent( 1, 'MEDIA_IMAGE_THUMBNAIL' ) );

			expect( wrapper.props().src ).to.be.equal( resize( fixtures.media[ 0 ].URL, { w: MAX_WIDTH } ) );
		} );
	} );
} );
