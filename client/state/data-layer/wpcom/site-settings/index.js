/**
 * Internal dependencies
 */
import { http } from 'state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'state/data-layer/wpcom-http/utils';
import { SITE_SETTINGS_REQUEST } from 'state/action-types';
import {
	receiveSiteSettings as receiveSiteSettingsAction,
	siteSettingsRequestFailure,
	siteSettingsRequestSuccess
} from 'state/site-settings/actions';

/**
 * @module state/data-layer/wpcom/site-settings
 */

/**
 * Dispatches a request to fetch settings for a site
 *
 * @param {Function} dispatch Redux dispatcher
 * @param {Object} action Redux action
 * @param {Function} next data-layer-bypassing dispatcher
 * @returns {Object} original action
 */
export const requestSiteSettings = ( { dispatch }, action, next ) => {
	const siteId = action.siteId;

	dispatch( http( {
		apiVersion: '1.4',
		method: 'GET',
		path: `/sites/${ siteId }/settings`,
		onSuccess: action,
		onFailure: action,
	} ) );

	return next( action );
};

/**
 * Dispatches returned site settings data
 *
 * @param {Function} dispatch Redux dispatcher
 * @param {Object} action Redux action
 * @param {Function} next dispatches to next middleware in chain
 * @param {NUMBER} siteId id of the site we're requesting settings for
 * @param {Array} settings raw data from site settings API
 */
export const receiveSiteSettings = ( { dispatch }, action, next, siteId, settings ) => {
	dispatch( siteSettingsRequestSuccess( siteId ) );
	dispatch( receiveSiteSettingsAction( siteId, settings ) );
};

/**
 * Dispatches returned error from site settings request
 *
 * @param {Function} dispatch Redux dispatcher
 * @param {Object} action Redux action
 * @param {Function} next dispatches to next middleware in chain
 * @param {NUMBER} siteId id of the site we're requesting settings for
 * @param {Object} rawError raw error from HTTP request
 */
export const receiveError = ( { dispatch }, action, next, siteId, rawError ) => {
	const error = rawError instanceof Error
		? rawError.message
		: rawError;

	dispatch( siteSettingsRequestFailure( siteId, error ) );
};

export const dispatchSiteSettingsRequest = dispatchRequest( requestSiteSettings, receiveSiteSettings, receiveError );

export default {
	[ SITE_SETTINGS_REQUEST ]: [ dispatchSiteSettingsRequest ],
};
