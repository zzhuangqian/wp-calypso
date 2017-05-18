/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import {
	WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_CREATE,
	WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_CLEAR,
	WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_STEP_START,
	WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_STEP_END,
} from '../../../action-types';

// TODO: Eventually think about edits that could belong to multiple sites
// (e.g. moving a product from one site to another)
export function createApiPlanForEdits( siteId, productEdits /*, variationEdits = null, productCategoryEdits = null*/ ) {
	// TODO: categories.creates
	// TODO: categories.updates
	// TODO: categories.deletes

	const productCreateEdits = productEdits.creates || [];
	const productCreateSteps = productCreateEdits.map( product => {
		return {
			name: translate( 'Creating %(product)s', { args: { product: product.name } } ),
			operation: { name: 'createProduct', siteId, id: product.id },
		};
	} );
	// TODO: product.updates
	// TODO: product.deletes

	// TODO: variation.creates
	// TODO: variation.updates
	// TODO: variation.deletes

	const plan = [
		...productCreateSteps,
	];
	return createApiPlan( plan );
}

/* TODO: Figure out the next step and start it.
export function continueApiPlan( plan ) {
	//const nextStep = getNextStep( plan );

	//...api call for operation

	//return startApiPlanStep( nextStep );
}
*/

export function clearApiPlan() {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_CLEAR,
	};
}

// The functions below are used internally and for testing.

export function createApiPlan( plan ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_CREATE,
		payload: plan,
	};
}

export function startApiPlanStep( stepIndex, time = Date.now() ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_STEP_START,
		payload: { stepIndex, time }
	};
}

export function endApiPlanStep( stepIndex, result, time = Date.now() ) {
	return {
		type: WOOCOMMERCE_EDIT_PRODUCT_APIPLAN_STEP_END,
		payload: { stepIndex, result, time }
	};
}

