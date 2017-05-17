/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Gridicon from 'gridicons';

// TODO add doc url and documentation link

class SetupTask extends Component {
	static propTypes = {
		actions: PropTypes.arrayOf( PropTypes.shape( {
			isSecondary: PropTypes.string.bool,
			label: PropTypes.string.isRequired,
			onClick: PropTypes.func,
			path: PropTypes.string,
		} ) ),
		checked: PropTypes.bool.isRequired,
		docURL: PropTypes.string,
		explanation: PropTypes.string,
		label: PropTypes.string.isRequired,
	};

	static defaultProps = {
		isSecondary: false,
	}

	renderTaskPrimaryActions = ( actions ) => {
		const primaryActions = actions.filter( action => ! action.isSecondary );
		return (
			<div className="dashboard__setup-task-primary-actions">
				{
					primaryActions.map( ( action, index ) => {
						return (
							<Button compact href={ action.path } key={ index }>{ action.label }</Button>
						);
					} )
				}
			</div>
		);
	};

	renderTaskSecondaryActions = ( actions ) => {
		const secondaryActions = actions.filter( action => action.isSecondary );
		return (
			<div className="dashboard__setup-task-secondary-actions">
				{
					secondaryActions.map( ( action, index ) => {
						return (
							<a key={ index } onClick={ action.onClick }>{ action.label }</a>
						);
					} )
				}
			</div>
		);
	};

	render = () => {
		const { actions, checked, docURL, explanation, label, translate } = this.props;
		const docLink = docURL ? <a href={ docURL }>{ translate( 'Documentation' ) }</a> : null;

		return (
			<div className="dashboard__setup-task">
				<div className="dashboard__setup-task-status">
					{ checked ? <Gridicon icon="checkmark" size={ 36 } /> : null }
				</div>
				<div className="dashboard__setup-task-label">
					<h2>
						{ label }
					</h2>
					<p>
						{ explanation } { docLink }
					</p>
				</div>
				<div className="dashboard__setup-task-actions">
					{ this.renderTaskPrimaryActions( actions ) }
					{ this.renderTaskSecondaryActions( actions ) }
				</div>
			</div>
		);
	}
}

export default localize( SetupTask );
