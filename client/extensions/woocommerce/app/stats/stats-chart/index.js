/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import page from 'page';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import QuerySiteStats from 'components/data/query-site-stats';
import { getSiteStatsNormalizedData, isRequestingSiteStatsForQuery } from 'state/stats/lists/selectors';
import ElementChart from 'components/chart';
import Legend from 'components/chart/legend';

class StatsChart extends Component {
	state = {
		selectedTabIndex: 0
	}

	barClick = bar => {
		page.redirect( `${ this.props.path }?startDate=${ bar.data.period }` );
	}

	buildChartData = ( item, selectedTab ) => {
		const { selectedDate } = this.props;
		const className = classnames( item.classNames.join( ' ' ), {
			'is-selected': item.period === selectedDate,
		} );
		let value;
		switch ( selectedTab.attr ) {
			case 'total_sales':
				value = item.total_sales;
				break;
			case 'net_sales':
				value = Number( item.total_sales ) - Number( item.total_tax );
				break;
			case 'orders':
				value = item.orders;
				break;
			case 'order_average':
				value = item.orders === '0' ? 0 : Number( item.products ) / Number( item.orders );
				break;
			default:
				value = 0;
		}
		return {
			label: item.labelDay,
			value,
			nestedValue: null,
			data: item,
			tooltipData: [],
			className,
		};
	}

	render() {
		const { siteId, query, data } = this.props;
		const { selectedTabIndex } = this.state;
		const tabs = [
			{ label: 'Gross Sales', attr: 'total_sales' },
			{ label: 'Net Sales', attr: 'net_sales' },
			{ label: 'Orders', attr: 'orders' },
			{ label: 'Order Average', attr: 'order_average' },
		];
		const selectedTab = tabs[ selectedTabIndex ];
		const isLoading = ! ! data.length;
		const chartData = data.map( item => this.buildChartData( item, selectedTab ) );
		return (
			<Card className="stats-chart stats-module">
				{ siteId && <QuerySiteStats
					siteId={ siteId }
					statType="statsOrders"
					query={ query }
				/> }
				<Legend
					activeTab={ selectedTab }
				/>
				<ElementChart loading={ isLoading } data={ chartData } barClick={ this.barClick } />
			</Card>
		);
	}
}

StatsChart.propTypes = {
	data: PropTypes.array.isRequired,
	isRequesting: PropTypes.bool.isRequired,
	siteId: PropTypes.number,
	query: PropTypes.object.isRequired,
	selectedDate: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
};

export default connect(
	( state, { query, siteId } ) => {
		return {
			data: getSiteStatsNormalizedData( state, siteId, 'statsOrders', query ),
			isRequesting: isRequestingSiteStatsForQuery( state, siteId, 'statsOrders', query ),
		};
	}
)( StatsChart );
