/**
 * Internal dependencies
 */
import wp from 'lib/wp';
import { error } from '../../actions';
import {
	WOOCOMMERCE_API_BATCH_VARIATIONS,
	WOOCOMMERCE_API_BATCH_VARIATIONS_SUCCESS,
} from '../../../action-types';

export function batchVariations( siteId, product, variations ) {
	return ( dispatch ) => {
		const createAction = {
			type: WOOCOMMERCE_API_BATCH_VARIATIONS,
			payload: { siteId, product, variations },
		};

		dispatch( createAction );

		// TODO Throttle?
		const create = variations.map( function( variation ) {
			const { id, ...variationData } = variation;
			if ( typeof id !== 'number' ) {
				return variationData;
			}
		} );

		const update = variations.filter( v => typeof v.id === 'number' ) || [];

		const jetpackProps = { path: `/jetpack-blogs/${ siteId }/rest-api/` };
		const httpProps = {
			path: '/wc/v2/products/' + product.id + '/variations/batch',
			body: JSON.stringify( { create, update } ),
			json: true,
		};

		return wp.req.post( jetpackProps, httpProps )
			.then( ( { data } ) => {
				dispatch( batchVariationsSuccess( siteId, data ) );
			} )
			.catch( err => {
				dispatch( error( siteId, createAction, err ) );
			} );
	};
}

// TODO Error Checking
export function batchVariationsSuccess( siteId, data ) {
	return {
		type: WOOCOMMERCE_API_BATCH_VARIATIONS_SUCCESS,
		payload: {
			siteId,
			data,
		}
	};
}
