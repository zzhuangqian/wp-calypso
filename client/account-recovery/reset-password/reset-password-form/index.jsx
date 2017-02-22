/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { identity } from 'lodash';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import Button from 'components/button';
import FormFieldset from 'components/forms/form-fieldset';
import FormLegend from 'components/forms/form-legend';
import ResetOptionSet from './reset-option-set';

import {
	pickPasswordResetOption,
	requestPasswordReset,
} from 'state/account-recovery/reset/actions';

import {
	getAccountRecoveryResetOptions,
	getAccountRecoveryResetPickedOption,
	getAccountRecoveryResetUserData,
} from 'state/selectors';

export class ResetPasswordFormComponent extends Component {
	static defaultProps = {
		translate: identity,
	};

	static propTypes = {
		translate: PropTypes.func.isRequired,
		resetOptions: PropTypes.array.isRequired,
	};

	state = {
		isSubmitting: false,
	};

	submitForm = () => {
		this.setState( { isSubmitting: true } );

		this.props.requestPasswordReset( {
			method: this.props.pickedOption,
			user: this.props.userData.user,
			// ...this.props.userData,
		} );
	};

	onResetOptionChanged = ( event ) => {
		this.props.pickPasswordResetOption( event.currentTarget.value );
	};

	render() {
		const {
			resetOptions,
			pickedOption,
			translate,
		} = this.props;

		const { isSubmitting } = this.state;
		const isPrimaryButtonEnabled = pickedOption && ! isSubmitting;

		return (
			<div className="reset-password-form">
				<h2 className="reset-password-form__title">
					{ translate( 'Reset your password' ) }
				</h2>
				<p>
					{ translate(
						'To reset your password and recover access to your account, ' +
						'select one of these options and follow the instructions.'
					) }
				</p>
				<Card>
					<FormFieldset className="reset-password-form__field-set">
						<FormLegend className="reset-password-form__legend">
							{ translate( 'How would you like to reset your password?' ) }
						</FormLegend>
						{ resetOptions.map( ( { email, sms, name }, index ) => (
							<ResetOptionSet
								key={ index }
								email={ email }
								sms={ sms }
								name={ name }
								onOptionChanged={ this.onResetOptionChanged }
								selectedResetOption={ pickedOption }
							/>
						) ) }
					</FormFieldset>
					<Button
						className="reset-password-form__submit-button"
						onClick={ this.submitForm }
						disabled={ ! isPrimaryButtonEnabled }
						primary>
						{ translate( 'Continue' ) }
					</Button>
				</Card>
			</div>
		);
	}
}

export default connect(
	( state ) => ( {
		resetOptions: getAccountRecoveryResetOptions( state ),
		pickedOption: getAccountRecoveryResetPickedOption( state ),
		userData: getAccountRecoveryResetUserData( state ),
	} ),
	{
		pickPasswordResetOption,
		requestPasswordReset,
	}
)( localize( ResetPasswordFormComponent ) );
