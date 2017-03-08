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
import StepWrapper from 'signup/step-wrapper';
import signupUtils from 'signup/utils';
import SignupActions from 'lib/signup/actions';
import { getSuggestedUsername } from 'state/signup/optional-dependencies/selectors';

import { recordTracksEvent } from 'state/analytics/actions';

let FB;
import { FacebookLogin } from 'react-facebook-login-component';

export class SocialStep extends Component {
	static propTypes = {
		flowName: PropTypes.string,
		translate: PropTypes.func,
		subHeaderText: PropTypes.string,
	};

	static defaultProps = {
		translate: identity,
		suggestedUsername: identity
	};

	state = {
		submitting: false,
		subHeaderText: '',
	};

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.step && 'invalid' === nextProps.step.status ) {
			this.setState( { submitting: false } );
		}

		if ( this.props.flowName !== nextProps.flowName || this.props.subHeaderText !== nextProps.subHeaderText ) {
			this.setSubHeaderText( nextProps );
		}
	}

	componentWillMount() {
		this.setSubHeaderText( this.props );
	}

	setSubHeaderText( props ) {
		let subHeaderText = props.subHeaderText;

		/**
		 * Update the step sub-header if they only want to create an account, without a site.
		 */
		if (
			1 === signupUtils.getFlowSteps( props.flowName ).length &&
			'userfirst' !== props.flowName
		) {
			subHeaderText = this.props.translate( 'Welcome to the wonderful WordPress.com community' );
		}

		this.setState( { subHeaderText: subHeaderText } );
	}

	save = ( form ) => {
		SignupActions.saveSignupStep( {
			stepName: this.props.stepName,
			form: form
		} );
	};

	submitForm = ( event ) => {
		event.preventDefault();

		SignupActions.submitSignupStep( {
			stepName: this.props.stepName,
			email: this.state.email
		} );

		this.props.goToNextStep();
	}

	userCreationComplete() {
		return this.props.step && 'completed' === this.props.step.status;
	}

	userCreationPending() {
		return this.props.step && 'pending' === this.props.step.status;
	}

	userCreationStarted() {
		return this.userCreationPending() || this.userCreationComplete();
	}

	getRedirectToAfterLoginUrl() {
		const stepAfterRedirect = signupUtils.getNextStepName( this.props.flowName, this.props.stepName ) ||
			signupUtils.getPreviousStepName( this.props.flowName, this.props.stepName );
		return this.originUrl() + signupUtils.getStepUrl(
				this.props.flowName,
				stepAfterRedirect
			);
	}

	originUrl() {
		return window.location.protocol + '//' + window.location.hostname +
			( window.location.port ? ':' + window.location.port : '' );
	}

	submitButtonText() {
		const { translate } = this.props;

		if ( this.userCreationPending() ) {
			return translate( 'Creating Your Account…' );
		}

		if ( this.userCreationComplete() ) {
			return translate( 'Account created - Go to next step' );
		}

		return translate( 'Create My Account' );
	}

	changeEmail = ( event ) => {
		this.setState( {
			email: event.target.value
		} );
	};

	emailField() {
		return (
			<input type="email" name="email" onChange={ this.changeEmail } />
		);
	}

	responseFacebook (response) {
		//anything else you want to do(save to localStorage)...
		FB.api('/me', { access_token: response.accessToken, fields: 'id,email,name,first_name,last_name,name,token_for_business' }, function() {
			//console.log( response2 );
		} );

		FB.api('/me/accounts', { access_token: response.accessToken }, function() {
			//console.log( response3 );
		} );
	}

	socialConnect() {
		return (
			<div className="facebook-login-wrapper">
				<FacebookLogin socialId="10154498991051491"
					language="en_US"
					scope="public_profile,email,manage_pages"
					responseHandler={ this.responseFacebook }
					xfbml={true}
					version="v2.5"
					class="facebook-login"
					buttonText="Sign up with Facebook" />
			</div>
		);
	}

	renderSignupForm() {
		return (
			<div>
				<form onSubmit={ this.submitForm }>
					{ this.emailField() }
				</form>
				{ this.socialConnect() }
			</div>
		);
	}

	render() {
		return (
			<StepWrapper
				flowName={ this.props.flowName }
				stepName={ this.props.stepName }
				headerText={ this.props.headerText }
				subHeaderText={ this.state.subHeaderText }
				positionInFlow={ this.props.positionInFlow }
				fallbackHeaderText={ this.props.translate( 'Create your account.' ) }
				signupProgress={ this.props.signupProgress }
				stepContent={ this.renderSignupForm() }
			/>
		);
	}
}

export default connect(
	( state ) => ( {
		suggestedUsername: getSuggestedUsername( state )
	} ),
	{
		recordTracksEvent
	}
)( localize( SocialStep ) );
