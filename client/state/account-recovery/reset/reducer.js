/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import { stubTrue, stubFalse } from 'lodash';

/**
 * Internal dependencies
 */
import { createReducer } from 'state/utils';

import {
	ACCOUNT_RECOVERY_RESET_UPDATE_USER_DATA,
	ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR,
	ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE,
	ACCOUNT_RECOVERY_RESET_OPTIONS_REQUEST,
	ACCOUNT_RECOVERY_RESET_PICK_RESET_OPTION,
	ACCOUNT_RECOVERY_RESET_TRANSIT_TO_ROUTE,
} from 'state/action-types';

const isRequesting = createReducer( false, {
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_REQUEST ]: stubTrue,
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE ]: stubFalse,
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR ]: stubFalse,
} );

const errorReducer = createReducer( null, {
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_REQUEST ]: () => null,
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE ]: () => null,
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR ]: ( state, { error } ) => error,
} );

const itemsReducer = createReducer( [], {
	[ ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE ]: ( state, { items } ) => items,
} );

const resetOptions = combineReducers( {
	isRequesting,
	error: errorReducer,
	items: itemsReducer,
} );

const userDataFieldReducer = ( expectedField ) => createReducer( '', {
	[ ACCOUNT_RECOVERY_RESET_UPDATE_USER_DATA ]: ( state, action ) => null != action[ expectedField ] ? action[ expectedField ] : state,
} );

const userData = combineReducers( {
	user: userDataFieldReducer( 'user' ),
	firstName: userDataFieldReducer( 'firstName' ),
	lastName: userDataFieldReducer( 'lastName' ),
	url: userDataFieldReducer( 'url' ),
} );

const currentRoute = createReducer( '', {
	[ ACCOUNT_RECOVERY_RESET_TRANSIT_TO_ROUTE ]: ( state, { route } ) => route,
} );

export default combineReducers( {
	options: resetOptions,
	userData,
	method: createReducer( null, {
		[ ACCOUNT_RECOVERY_RESET_PICK_RESET_OPTION ]: ( state, { method } ) => method,
	} ),
	currentRoute,
} );
