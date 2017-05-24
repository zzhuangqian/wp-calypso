/**
 * External dependencies
 */
import React from 'react';

const SetupHeader = ( { imageSource, imageWidth, subtitle, title } ) => {
	return (
		<div className="dashboard__setup-header">
			{ imageSource ? <img src={ imageSource } width={ imageWidth } className="dashboard__setup-header-image" /> : null }
			{ <h2 className="dashboard__setup-header-title form-section-heading">{ title }</h2> }
			{ subtitle ? <p className="dashboard__setup-header-subtitle">{ subtitle }</p> : null }
		</div>
	);
};

SetupHeader.propTypes = {
	imageSource: React.PropTypes.string,
	imageWidth: React.PropTypes.number,
	title: React.PropTypes.string.isRequired,
	subtitle: React.PropTypes.string,
};

export default SetupHeader;
