/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
  WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_CREATE,
} from '../../../../action-types';
import {
	createApiPlanForEdits,
} from '../actions';

describe( 'createApiPlanForEdits', () => {
	it( 'should create a simple product with no dependencies', () => {
		const productEdits = {
			creates: [
				{ id: { index: 0 }, name: 'New Product', type: 'simple' },
			],
		};

		const expectedPlan = [
			{
				name: 'Creating New Product',
				operation: { name: 'createProduct', siteId: 1337, id: { index: 0 } },
			},
		];

		const action = createApiPlanForEdits( 1337, productEdits, null, null );
		expect( action ).to.exist;
		expect( action.type ).to.equal( WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_CREATE );
		expect( action.payload ).to.eql( expectedPlan );
	} );
} );

