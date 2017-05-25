/**
 * External dependencies
 */
import { mapValues } from 'lodash';

/**
 * Normalize settings for use in Redux.
 *
 * @param  {Object} settings Raw settings
 * @return {Object} Normalized settings
 */
export const normalizeSettings = settings => {
	return mapValues( settings, ( setting, key ) => {
		switch ( key ) {
			case 'cache_acceptable_files':
			case 'cache_rejected_uri':
			case 'cache_rejected_user_agent':
				return setting.join( '\n' );
			default:
				return setting;
		}
	} );
};

/**
 * Sanitize settings before saving.
 *
 * @param  {Object} settings Normalized settings
 * @return {Object} Sanitized settings
 */
export const sanitizeSettings = settings => {
	return mapValues( settings, ( setting, key ) => {
		switch ( key ) {
			case 'cache_acceptable_files':
			case 'cache_rejected_uri':
			case 'cache_rejected_user_agent':
				return setting.split( '\n' );
			// Don't include read-only fields when saving.
			case 'cache_direct_pages':
			case 'cache_mobile_browsers':
			case 'cache_mobile_prefixes':
			case 'cache_mod_rewrite':
			case 'cache_next_gc':
			case 'cache_readonly':
			case 'generated':
			case 'is_preload_enabled':
			case 'is_preloading':
			case 'minimum_preload_interval':
			case 'post_count':
			case 'preload_refresh':
			case 'supercache':
			case 'wpcache':
				return undefined;
			default:
				return setting;
		}
	} );
};
