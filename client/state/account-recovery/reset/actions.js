/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	ACCOUNT_RECOVERY_RESET_OPTIONS_REQUEST,
	ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE,
	ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR,
	ACCOUNT_RECOVERY_RESET_REQUEST,
	ACCOUNT_RECOVERY_RESET_REQUEST_SUCCESS,
	ACCOUNT_RECOVERY_RESET_REQUEST_ERROR,
	ACCOUNT_RECOVERY_RESET_VALIDATE_RESET_REQUEST,
	ACCOUNT_RECOVERY_RESET_VALIDATE_RESET_REQUEST_SUCCESS,
	ACCOUNT_RECOVERY_RESET_VALIDATE_RESET_REQUEST_ERROR,
	ACCOUNT_RECOVERY_RESET_UPDATE_USER_DATA,
	ACCOUNT_RECOVERY_RESET_PICK_RESET_OPTION,
	ACCOUNT_RECOVERY_RESET_TRANSIT_TO_ROUTE,
} from 'state/action-types';

export const transitToAccountRecoveryRoute = ( route ) => ( {
	type: ACCOUNT_RECOVERY_RESET_TRANSIT_TO_ROUTE,
	route,
} );

export const fetchResetOptionsSuccess = ( items ) => ( {
	type: ACCOUNT_RECOVERY_RESET_OPTIONS_RECEIVE,
	items,
} );

export const fetchResetOptionsError = ( error ) => ( {
	type: ACCOUNT_RECOVERY_RESET_OPTIONS_ERROR,
	error,
} );

const fromApi = ( data ) => ( [
	{
		email: data.primary_email,
		sms: data.primary_sms,
		name: 'primary',
	},
	{
		email: data.secondary_email,
		sms: data.secondary_sms,
		name: 'secondary',
	},
] );

// The userData can either be { user } or { firstName, lastName, url }
export const fetchResetOptions = ( userData ) => ( dispatch ) => {
	dispatch( {
		type: ACCOUNT_RECOVERY_RESET_OPTIONS_REQUEST,
	} );

	return wpcom.req.get( {
		body: userData,
		apiNamespace: 'wpcom/v2',
		path: '/account-recovery/lookup',
	} ).then( data => {
		dispatch( fetchResetOptionsSuccess( fromApi( data ) ) );
		dispatch( transitToAccountRecoveryRoute( '/account-recovery/reset-password' ) );
	} )
	.catch( error => dispatch( fetchResetOptionsError( error ) ) );
};

export const fetchResetOptionsByLogin = ( user ) => fetchResetOptions( { user } );

export const fetchResetOptionsByNameAndUrl = ( firstname, lastname, url ) => fetchResetOptions( { firstname, lastname, url } );

export const requestPasswordResetSuccess = () => ( {
	type: ACCOUNT_RECOVERY_RESET_REQUEST_SUCCESS,
} );

export const requestPasswordResetError = ( error ) => ( {
	type: ACCOUNT_RECOVERY_RESET_REQUEST_ERROR,
	error,
} );

const getAfterResetRequestRoute = ( method ) => {
	if ( 'primary_email' === method || 'secondary_email' === method ) {
		return transitToAccountRecoveryRoute( '/account-recovery/reset-password/email-sent' );
	}

	if ( 'primary_sms' === method || 'secondary_email' === method ) {
		return transitToAccountRecoveryRoute( '/account-recovery/reset-password/sms-form' );
	}

	return requestPasswordResetError( {
		message: 'Unknown reset method has been given',
	} );
};

// The `request` can be { user, method } or { firstName, lastName, url, method }
export const requestPasswordReset = ( request ) => ( dispatch ) => {
	dispatch( {
		type: ACCOUNT_RECOVERY_RESET_REQUEST,
	} );

	return wpcom.req.post( {
		body: request,
		apiNamespace: 'wpcom/v2',
		path: '/account-recovery/request-reset',
	} ).then( () => {
		dispatch( requestPasswordResetSuccess() );
		dispatch( getAfterResetRequestRoute( request.method ) );
	} )
	.catch( ( error ) => dispatch( requestPasswordResetError( error ) ) );
};

export const validatePasswordResetRequestSuccess = () => ( {
	type: ACCOUNT_RECOVERY_RESET_VALIDATE_RESET_REQUEST_SUCCESS,
} );

export const validatePasswordResetRequestError = ( error ) => ( {
	type: ACCOUNT_RECOVERY_RESET_VALIDATE_RESET_REQUEST_ERROR,
	error,
} );

export const validatePasswordResetRequest = ( request ) => ( dispatch ) => {
	dispatch( {
		type: ACCOUNT_RECOVERY_RESET_VALIDATE_RESET_REQUEST,
	} );

	return wpcom.req.post( {
		body: request,
		apiNamespace: 'wpcom/v2',
		path: '/account-recovery/validate',
	} ).then( () => dispatch( validatePasswordResetRequestSuccess() ) )
	.catch( ( error ) => dispatch( validatePasswordResetRequestError( error ) ) );
};

const updatePasswordResetUserData = ( userData ) => ( {
	type: ACCOUNT_RECOVERY_RESET_UPDATE_USER_DATA,
	...userData,
} );

export const updatePasswordResetUserLogin = ( user ) => updatePasswordResetUserData( { user } );

export const updatePasswordResetUserFirstname = ( firstName ) => updatePasswordResetUserData( { firstName } );

export const updatePasswordResetUserLastname = ( lastName ) => updatePasswordResetUserData( { lastName } );

export const updatePasswordResetUserSiteUrl = ( url ) => updatePasswordResetUserData( { url } );

export const pickPasswordResetOption = ( method ) => ( {
	type: ACCOUNT_RECOVERY_RESET_PICK_RESET_OPTION,
	method,
} );
