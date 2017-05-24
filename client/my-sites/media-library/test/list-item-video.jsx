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

const styleUrl = url => `url(${ url })`;

describe( 'MediaLibraryListItem video', function() {
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

	const expectedBackground = () => styleUrl( photon( fixtures.media[ 1 ].thumbnails.fmt_hd, { width: MAX_WIDTH } ) );
	const getComponent = type => <MediaLibraryListItemVideo
										media={ fixtures.media[ 1 ] }
										scale={ 1 }
										maxImageWidth={ MAX_WIDTH }
										thumbnailType={ type } />;

	context( 'thumbnail display mode', function() {
		it( 'defaults to photon', function() {
			wrapper = shallow( getComponent() );

			expect( wrapper.props().style.backgroundImage ).to.be.equal( expectedBackground() );
		} );

		it( 'returns a photon thumbnail for type MEDIA_IMAGE_PHOTON', function() {
			wrapper = shallow( getComponent( 'MEDIA_IMAGE_PHOTON' ) );

			expect( wrapper.props().style.backgroundImage ).to.be.equal( expectedBackground() );
		} );

		it( 'returns a photon thumbnail for type MEDIA_IMAGE_RESIZER', function() {
			wrapper = shallow( getComponent( 'MEDIA_IMAGE_RESIZER' ) );

			expect( wrapper.props().style.backgroundImage ).to.be.equal( expectedBackground() );
		} );

		it( 'returns a fmt_hd thumbnail for type MEDIA_IMAGE_THUMBNAIL', function() {
			wrapper = shallow( getComponent( 'MEDIA_IMAGE_THUMBNAIL' ) );

			expect( wrapper.props().style.backgroundImage ).to.be.equal( styleUrl( fixtures.media[ 1 ].thumbnails.fmt_hd ) );
		} );
	} );
} );
