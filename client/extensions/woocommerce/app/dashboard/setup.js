/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import SetupFooter from './setup-footer';
import SetupHeader from './setup-header';
import SetupTask from './setup-task';

class Setup extends Component {
	static propTypes = {
		onFinished: PropTypes.func,
		site: PropTypes.shape( {
			slug: PropTypes.string.isRequired,
		} ),
		storeHasBeenCustomized: PropTypes.bool,
		storeHasProducts: PropTypes.bool,
		storePaymentsAreSetUp: PropTypes.bool,
		storeShippingIsSetUp: PropTypes.bool,
		storeTaxesAreSetUp: PropTypes.bool,
	};

	// TODO - replace with props mapped from state when this info becomes available in state
	static defaultProps = {
		storeHasBeenCustomized: true,
		storeHasProducts: false,
		storePaymentsAreSetUp: false,
		storeShippingIsSetUp: false,
		storeTaxesAreSetUp: false,
	}

	state = {
		showShippingTask: true,
		showTaxesTask: true,
	}

	itemLink = ( path ) => {
		const { site } = this.props;
		const link = path.replace( ':site', site.slug );
		return link;
	}

	onClickNoShip = ( event ) => {
		event.preventDefault();
		this.setState( {
			showShippingTask: false
		} );
		// TODO - dispatch an action to record the user preference at WordPress.com
	}

	onClickNoTaxes = () => {
		event.preventDefault();
		this.setState( {
			showTaxesTask: false
		} );
		// TODO - dispatch an action to record the user preference at WordPress.com
	}

	getSetupTasks = () => {
		const {
			storeHasBeenCustomized,
			storeHasProducts,
			storePaymentsAreSetUp,
			storeShippingIsSetUp,
			storeTaxesAreSetUp,
			translate
		} = this.props;

		return [
			{
				checked: storeHasProducts,
				docURL: 'https://support.wordpress.com/',
				explanation: translate( 'Add products one at a time or import many in a single import.' ),
				label: translate( 'Add a product' ),
				show: true,
				actions: [
					{
						label: translate( 'Import' ),
						path: this.itemLink( '/store/products/:site/import' ),
						slug: 'add-products-import',
					},
					{
						label: 'Add a product',
						path: this.itemLink( '/store/products/:site/add' ),
					}
				]
			},
			{
				checked: storeShippingIsSetUp,
				docURL: 'https://support.wordpress.com/',
				explanation: translate( 'Configure the locations to which you ship your products.' ),
				label: translate( 'Set up shipping' ),
				show: this.state.showShippingTask,
				actions: [
					{
						label: translate( 'Set up shipping' ),
						path: this.itemLink( '/store/settings/:site/shipping' ),
					},
					{
						label: translate( 'I won\'t be shipping' ),
						isSecondary: true,
						onClick: this.onClickNoShip
					}
				]
			},
			{
				checked: storePaymentsAreSetUp,
				docURL: 'https://support.wordpress.com/',
				explanation: translate( 'Choose which payment methods to offer your customers.' ),
				label: translate( 'Set up payments' ),
				show: true,
				actions: [
					{
						label: translate( 'Set up payments' ),
						path: this.itemLink( '/store/settings/:site/payments' ),
					}
				]
			},
			{
				checked: storeTaxesAreSetUp,
				docURL: 'https://support.wordpress.com/',
				explanation: translate( 'Configure how tax rates are calculated at your store.' ),
				label: translate( 'Set up taxes' ),
				show: this.state.showTaxesTask,
				actions: [
					{
						label: translate( 'Set up taxes' ),
						path: this.itemLink( '/store/settings/:site/tax' ),
					},
					{
						label: translate( 'I\'m not charging sales tax' ),
						isSecondary: true,
						onClick: this.onClickNoTaxes
					}
				]
			},
			{
				checked: storeHasBeenCustomized,
				docURL: 'https://support.wordpress.com/',
				explanation: translate( 'View your store, test your settings and customize the design.' ),
				label: translate( 'View and customize' ),
				show: true,
				actions: [
					{
						label: translate( 'Customize' ),
						path: this.itemLink( 'https://:site/wp-admin/customize.php?return=%2Fwp-admin%2F' ),
					}
				]
			}
		];
	}

	renderSetupTask = ( setupTask, index ) => {
		if ( ! setupTask.show ) {
			return null;
		}

		return (
			<SetupTask
				actions={ setupTask.actions }
				checked={ setupTask.checked }
				docURL= { setupTask.docURL }
				explanation={ setupTask.explanation }
				key={ index }
				label={ setupTask.label }
			/>
		);
	}

	render = () => {
		const { onFinished, translate } = this.props;

		return (
			<div className="card dashboard__setup-wrapper">
				<SetupHeader
					imageSource={ '/calypso/images/extensions/woocommerce/woocommerce-setup.svg' }
					title={ translate( 'Howdy! Let\'s set up your store & start selling' ) }
					subtitle={ translate( 'Below you will find the essential tasks to complete before making your store live.' ) }
				/>
				{ this.getSetupTasks().map( this.renderSetupTask ) }
				<SetupFooter
					onClick={ onFinished }
					label={ translate( 'I\'m finished setting up' ) }
				/>
			</div>
		);
	}
}

export default localize( Setup );
