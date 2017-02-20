/**
 * External dependencies
 */
import { assert } from 'chai';

/**
 * Internal dependenceis
 */
import { getAccountRecoveryResetPickedOption } from '../';

describe( 'getAccountRecoveryResetPickedOption()', () => {
	it( 'should return the method field under account recovery substate tree', () => {
		const pickedMethod = 'primary-email';
		const state = {
			accountRecovery: {
				reset: {
					method: pickedMethod,
				},
			},
		};

		assert.equal( getAccountRecoveryResetPickedOption( state ), pickedMethod );
	} );
} );
