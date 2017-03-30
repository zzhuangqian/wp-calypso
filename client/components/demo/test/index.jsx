/**
 * External dependencies
 */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe( 'Demo', function() {
	let Demo, translate;

	before( () => {
		Demo = require( '..' ).Demo;
	} );

	beforeEach( () => {
		translate = spy( () => 'translated content' );
	} );

	it( 'should default to noop for translation', function() {
		const wrapper = shallow( <Demo /> );

		expect( wrapper.find( 'p' ).props().children ).to.equal( undefined );
	} );

	it( 'should render translated content', function() {
		const wrapper = shallow( <Demo translate={ translate }></Demo> );

		expect( wrapper.find( 'p' ).props().children ).to.equal( 'translated content' );
		expect( translate ).to.have.been.calledWith( 'content' );
	} );
} );
