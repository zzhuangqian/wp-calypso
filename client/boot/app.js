// Initialize localStorage polyfill before any dependencies are loaded
require( 'lib/local-storage' )();
if ( process.env.NODE_ENV === 'development' ) {
	require( 'lib/wrap-es6-functions' )();
}

/**
 * External dependencies
 */
import debugFactory from 'debug';
import { invoke, over } from 'lodash';
import page from 'page';

/**
 * Internal dependencies
 */
import config from 'config';
import * as common from './common';
import createReduxStoreFromPersistedInitialState from 'state/initial-state';
import detectHistoryNavigation from 'lib/detect-history-navigation';
import userFactory from 'lib/user';

const debug = debugFactory( 'calypso' );

/**
 * Creates a function which when called with arguments
 *
 *     ( methodPath, arg1, arg2 )
 *
 * will attempt to call
 *
 * 		context[ methodPath ]( arg1, arg2 )
 *
 * for every `context` in `contexts`. Note that `methodPath` can represent a
 * nested method, e.g. `methods.myMethod`. The function returns an array
 * holding each invocation's result.
 *
 * @param {array} contexts collection of objects holding named methods
 * @return {function} custom invoker function; see above
 */
const invokeOver = ( contexts ) =>
	over( contexts.map( ( context ) =>
		( ...args ) => invoke( context, ...args )
	) );

const boot = currentUser => {
	debug( "Starting Calypso. Let's do this." );

	const project = require( `./project/${ config( 'project' ) }` );
	const invokeBoot = invokeOver( [ common, project ] );

	invokeBoot( 'locales', currentUser );
	invokeBoot( 'utils' );
	createReduxStoreFromPersistedInitialState( reduxStore => {
		invokeBoot( 'configureReduxStore', currentUser, reduxStore );
		invokeBoot( 'setupMiddlewares', currentUser, reduxStore );
		detectHistoryNavigation.start();
		page.start();
	} );
};

window.AppBoot = () => {
	const user = userFactory();
	if ( user.initialized ) {
		boot( user );
	} else {
		user.once( 'change', () => boot( user ) );
	}
};
