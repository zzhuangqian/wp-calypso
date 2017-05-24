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
import MediaLibraryListItemVideo from 'my-sites/media-library/list-item-video';

const MAX_WIDTH = 450;
const MEDIA_ITEM = {
	URL: 'http://example.files.wordpress.com/2015/05/g1009.mov',
	thumbnails: {
		fmt_hd: 'http://example.files.wordpress.com/2015/05/g1009.gif'
	}
};

const getComponent = type => <MediaLibraryListItemVideo
								media={ MEDIA_ITEM }
								scale={ 1 }
								maxImageWidth={ MAX_WIDTH }
								thumbnailType={ type } />;

const styleUrl = url => `url(${ url })`;
const expectedBackground = styleUrl( photon( MEDIA_ITEM.thumbnails.fmt_hd, { width: MAX_WIDTH } ) );

describe( 'MediaLibraryListItem video', function() {
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

			expect( wrapper.props().style.backgroundImage ).to.be.equal( expectedBackground );
		} );

		it( 'returns a photon thumbnail for type MEDIA_IMAGE_PHOTON', function() {
			wrapper = shallow( getComponent( 'MEDIA_IMAGE_PHOTON' ) );

			expect( wrapper.props().style.backgroundImage ).to.be.equal( expectedBackground );
		} );

		it( 'returns a photon thumbnail for type MEDIA_IMAGE_RESIZER', function() {
			wrapper = shallow( getComponent( 'MEDIA_IMAGE_RESIZER' ) );

			expect( wrapper.props().style.backgroundImage ).to.be.equal( expectedBackground );
		} );
	} );
} );
