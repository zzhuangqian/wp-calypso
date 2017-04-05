/**
 * External dependencies
 */
import debug from 'debug';

/**
 * Internal dependencies
 */
import config from 'config';

export default ( args ) => {
	if ( config( 'env_id' ) === 'production' ) {
		return () => {};
	}

	return debug( args );
};
