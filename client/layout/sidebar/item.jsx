/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';
import Gridicon from 'gridicons';

/**
 * Internal dependencies
 */
import { isExternal } from 'lib/url';
import { preload } from 'sections-preload';

export default React.createClass( {
	displayName: 'SidebarItem',

	propTypes: {
		label: React.PropTypes.string.isRequired,
		className: React.PropTypes.string,
		isPlaceholder: React.PropTypes.bool,
		link: React.PropTypes.string.isRequired,
		onNavigate: React.PropTypes.func,
		icon: React.PropTypes.string,
		selected: React.PropTypes.bool,
		preloadSectionName: React.PropTypes.string,
		testTarget: React.PropTypes.string,
		tipTarget: React.PropTypes.string
	},

	_preloaded: false,

	preload() {
		if ( ! this._preloaded && this.props.preloadSectionName ) {
			this._preloaded = true;
			preload( this.props.preloadSectionName );
		}
	},

	render() {
		const { className, children, icon, isPlaceholder, label, link,
			onNavigate, postType, selected, tipTarget } = this.props;
		const isExternalLink = isExternal( link );
		const classes = classnames( 'sidebar__item', className, {
			'is-placeholder': isPlaceholder,
			selected,
		} );

		return (
			<li
				className={ classes }
				data-tip-target={ tipTarget }
				data-post-type={ postType }
			>
				<a
					onClick={ onNavigate }
					href={ link }
					target={ isExternalLink ? '_blank' : null }
					onMouseEnter={ this.preload }
				>
					<Gridicon icon={ icon } size={ 24 } />
					<span className="menu-link-text">{ label }</span>
					{ isExternalLink ? <Gridicon icon="external" size={ 24 } /> : null }
				</a>
				{ children }
			</li>
		);
	}
} );
