/**
 * External dependencies
 */
import { find, get, isEmpty } from 'lodash';
import url from 'url';
import config from 'config';
import Debug from 'debug';

const debug = Debug( 'calypso:reader:discover' ); // eslint-disable-line
/**
 * Internal Dependencies
 */
import userUtils from 'lib/user/utils';
import { getSiteUrl as readerRouteGetSiteUrl } from 'reader/route';

function hasDiscoverSlug( post, searchSlug ) {
	const metaData = get( post, 'discover_metadata.discover_fp_post_formats' );
	return !! ( metaData && find( metaData, { slug: searchSlug } ) );
}

export const discoverBlogId = config( 'discover_blog_id' );

export function isDiscoverEnabled() {
	return userUtils.getLocaleSlug() === 'en';
}

export function isDiscoverPost( post ) {
	return !! ( get( post, 'discover_metadata' ) || get( post, 'site_ID' ) === config( 'discover_blog_id' ) );
}

export function isDiscoverSitePick( post ) {
	return hasDiscoverSlug( post, 'site-pick' );
}

export function isInternalDiscoverPost( post ) {
	return !! get( post, 'discover_metadata.featured_post_wpcom_data' );
}

export function getSiteUrl( post ) {
	const blogId = get( post, 'discover_metadata.featured_post_wpcom_data.blog_id' );
	// If we have a blog ID, we want to send them to the site detail page
	return blogId ? readerRouteGetSiteUrl( blogId ) : get( post, 'discover_metadata.permalink' );
}

export function getDiscoverBlogName( post ) {
	return get( post, 'discover_metadata.attribution.blog_name' );
}
export function hasSource( post ) {
	return isDiscoverPost( post ) && ! isDiscoverSitePick( post );
}

export function getSourceData( post ) {
	const sourceData = get( post, 'discover_metadata.featured_post_wpcom_data' );

	if ( sourceData ) {
		return {
			blogId: get( sourceData, 'blog_id' ),
			postId: get( sourceData, 'post_id' ),
			feedId: get( sourceData, 'feed_id' ),
		};
	}
	return {};
}

export function getLinkProps( linkUrl ) {
	const parsedUrl = url.parse( linkUrl ),
		hostname = get( parsedUrl, 'hostname' ),
		isExternal = hostname && hostname !== window.location.hostname;

	return {
		rel: isExternal ? 'external' : '',
		target: isExternal ? '_blank' : ''
	};
}

export function getSourceFollowUrl( post ) {
	let followUrl;

	if ( ! isDiscoverPost( post ) ) {
		return;
	}

	followUrl = get( post, 'discover_metadata.attribution.blog_url' );

	// If it's a site pick, try the permalink
	if ( ! followUrl && isDiscoverSitePick( post ) ) {
		followUrl = get( post, 'discover_metadata.permalink' );
	}

	return followUrl || '';
}


/** Create a post like object to render the card byline. If the discoverPick is empty
	the post is returned.
	@param {Object} post - the post on discover.wordpress.com
	@param {Object} discoverPick - has the pick site or feed object
	@return {Object}  - a post like object
**/
export function getDiscoverBylinePost( post, discoverPick ) {

	if ( isEmpty( discoverPick ) ) {
		return post;
	}

	const { site, feed } = discoverPick;
	const attribution = get( post, 'discover_metadata.attribution' );

	const bylinePost = Object.assign( {},
		feed || site || {},
		{
			date: post.date,
			URL: post.URL,
			primary_tag: post.primary_tag,
			site_name: attribution.blog_name || feed.name || site.name,
		}
	);

	if ( feed ) {
		bylinePost.author = {
			name:  attribution.author_name,
			URL: attribution.author_url,
			avatar_URL: attribution.avatar_url,
			has_avatar: !! attribution.avatar_url,
		};
	}
	return bylinePost;
}
