/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * @param {Object} state Global state app.
 * @return {String} The user-chosen way of doing password reset.
 */
export default ( state ) => {
	return get( state, 'accountRecovery.reset.method', null );
};
