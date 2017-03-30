/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import { isJetpackPlan } from 'lib/products-values';

export class Demo extends Component {
	static propTypes = {
		product: PropTypes.object.isRequired,
		translate: PropTypes.func.isRequired,
	}

	static defaultProps = {
		translate: noop,
	}

	render() {
		const { translate, product } = this.props;

		return <p>{ isJetpackPlan( product ) ? translate( 'jetpack content' ) : translate( 'content' ) }</p>;
	}
}

const mapStateToProps = null;
const mapDispatchToProps = null;

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)( localize( Demo ) );
