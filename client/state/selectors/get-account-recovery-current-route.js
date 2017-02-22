/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * @param {Object} state Global app state
 * @return {String} The route identifier where the account recovery flow is currently at.
 */
export default ( state ) => {
	return get( state, 'accountRecovery.reset.currentRoute', '' );
};
