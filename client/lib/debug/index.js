/**
 * External dependencies
 */
import debug from 'debug';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import config from 'config';

export default ( ...args ) => {
	if ( config( 'env_id' ) === 'production' ) {
		return noop;
	}

	return debug( ...args );
};
