/**
 * External dependencies
 */
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';

/**
 * Internal dependencies
 */
import useMockery from 'test/helpers/use-mockery';

describe( 'Demo', function() {
	const product = {};
	let isJetpackPlan, Demo, translate;

	useMockery( ( mockery ) => {
		isJetpackPlan = stub();
		mockery.registerMock( 'lib/products-values', { isJetpackPlan } );
	} );

	before( () => {
		Demo = require( '..' ).Demo;
	} );

	beforeEach( () => {
		translate = spy( () => 'translated content' );
	} );

	it( 'should default to noop for translation', function() {
		const wrapper = shallow( <Demo product={ product } /> );

		expect( wrapper.find( 'p' ).props().children ).to.equal( undefined );
	} );

	it( 'should render jetpack content', function() {
		isJetpackPlan.returns( true );
		const wrapper = shallow( <Demo translate={ translate } product={ product }></Demo> );

		expect( wrapper.find( 'p' ).props().children ).to.equal( 'translated content' );
		expect( translate ).to.have.been.calledWith( 'jetpack content' );
	} );

	it( 'should render non jetpack content', function() {
		isJetpackPlan.returns( false );
		const wrapper = shallow( <Demo translate={ translate } product={ product }></Demo> );

		expect( wrapper.find( 'p' ).props().children ).to.equal( 'translated content' );
		expect( translate ).to.have.been.calledWith( 'content' );
	} );
} );
