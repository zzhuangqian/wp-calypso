/**
 * External Dependencies
 */
import React from 'react';

/**
 * Internal Dependencies
 */
import AutoDirection from 'components/auto-direction';
import FeaturedVideo from './featured-video';
import FeaturedImage from './featured-image';
import ReaderPostCardExcerpt from './excerpt';

const StandardPost = ( { post, children, isDiscover } )=> {
	const canonicalMedia = post.canonical_media;
	let featuredAsset;
	if ( ! canonicalMedia ) {
		featuredAsset = null;
	} else if ( canonicalMedia.mediaType === 'video' ) {
		featuredAsset = <FeaturedVideo { ...canonicalMedia } videoEmbed={ canonicalMedia } />;
	} else {
		featuredAsset = <FeaturedImage imageUri={ canonicalMedia.src } href={ post.URL } />;
	}

	return (
		<div className="reader-post-card__post" >
			<AutoDirection>
				<h1 className="reader-post-card__title">
					<a className="reader-post-card__title-link" href={ post.URL }>{ post.title }</a>
				</h1>
			</AutoDirection>
			<div className="reader-post-card__post-details">
				{ featuredAsset }
				<div className="reader-post-card__post-text">
					<ReaderPostCardExcerpt post={ post } isDiscover={ isDiscover } />
					{ children }
				</div>
			</div>
		</div> );
};

StandardPost.propTypes = {
	post: React.PropTypes.object.isRequired,
	isDiscover: React.PropTypes.bool,
};

export default StandardPost;
