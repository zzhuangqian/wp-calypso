/**
 * External dependencies
 */
import { kebabCase } from 'lodash';

/**
 * Internal dependencies
 */
import {
	READER_FOLLOW_TAG_REQUEST,
	READER_FOLLOW_TAG_RECEIVE,
} from 'state/action-types';

/**
 * Helper function. Turns a tag name into a tag "slug" for use with the API.
 *
 * @param  {String} tag  Tag name to parse into a slug
 * @return {String}      Tag slug
 */
const slugify = ( tag ) => encodeURIComponent( kebabCase( tag ) );

export const requestFollowTag = ( tag ) => ( {
	type: READER_FOLLOW_TAG_REQUEST,
	payload: {
		tag,
		slug: slugify( tag ),
	}
} );

export const receiveFollowTag = ( { payload, error } ) => ( {
	type: READER_FOLLOW_TAG_RECEIVE,
	payload,
	error,
} );
