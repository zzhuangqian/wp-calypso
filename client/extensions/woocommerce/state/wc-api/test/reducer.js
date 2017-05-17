/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import reducer from '../reducer';
import { SERIALIZE, DESERIALIZE } from 'state/action-types';

// TODO: These tests will no longer be needed after this reducer is moved under state/site
describe( 'reducer', () => {
	it( 'should initialize to an empty object', () => {
		expect( reducer( undefined, { type: '@@UNKNOWN_ACTION' } ) ).to.eql( {} );
	} );

	it( 'should resist persisting', () => {
		expect( reducer( undefined, { type: SERIALIZE } ) ).to.eql( {} );
		expect( reducer( undefined, { type: DESERIALIZE } ) ).to.eql( {} );
	} );
} );

