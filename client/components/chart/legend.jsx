/**
 * External dependencies
 */
import React, { PropTypes, PureComponent, Component } from 'react';
import { find, noop } from 'lodash';

/**
 * Module variables
 */

class LegendItem extends PureComponent {
	clickHandler = () => {
		this.props.changeHandler( this.props.attr );
	}

	render() {
		return (
			<li className="chart__legend-option">
				<label htmlFor="checkbox" className="chart__legend-label is-selectable" onClick={ this.clickHandler } >
					<input type="checkbox" className="chart__legend-checkbox" checked={ this.props.checked } onChange={ function() {} } />
					<span className={ this.props.className }></span>{ this.props.label }
				</label>
			</li>
		);
	}
}

LegendItem.propTypes = {
	checked: PropTypes.bool.isRequired,
	label: PropTypes.oneOfType( [ PropTypes.object, PropTypes.string ] ),
	attr: PropTypes.string.isRequired,
	changeHandler: PropTypes.func.isRequired
};

class Legend extends Component {
	onFilterChange = chartItem => {
		this.props.clickHandler( chartItem );
	}

	render() {
		const legendColors = [ 'chart__legend-color is-dark-blue' ],
			activeTab = this.props.activeTab;

		const legendItems = this.props.availableCharts.map( function( legendItem, index ) {
			const colorClass = legendColors[ index ],
				checked = ( -1 !== this.props.activeCharts.indexOf( legendItem ) ),
				tab = find( this.props.tabs, { attr: legendItem } );

			return <LegendItem
				key={ index }
				className={ colorClass }
				label={ tab.label }
				attr={ tab.attr }
				changeHandler={ this.onFilterChange }
				checked={ checked }
			/>;
		}, this );

		return (
			<div className="chart__legend">
				<ul className="chart__legend-options">
					<li className="chart__legend-option" key="default-tab">
						<span className="chart__legend-label">
							<span className="chart__legend-color is-wordpress-blue"></span>
							{ activeTab.label }
						</span>
					</li>
					{ legendItems }
				</ul>
			</div>
		);
	}
}

Legend.propTypes = {
	activeTab: PropTypes.object.isRequired,
	tabs: PropTypes.array,
	activeCharts: PropTypes.array,
	availableCharts: PropTypes.array,
	clickHandler: PropTypes.func
};

Legend.defaultProps = {
	tabs: [],
	availableCharts: [],
	activeCharts: [],
	clickHandler: noop,
};

export default Legend;
