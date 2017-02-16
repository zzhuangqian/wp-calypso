/**
 * Internal dependencies
 */
import {
	lostPassword,
	forgotUsername,
	resetPassword,
	resetPasswordEmailForm,
	resetPasswordSmsForm,
	resetPasswordByTransactionId,
	resetPasswordConfirmForm,
	redirectLoggedIn
} from './controller';

const routes = {
	ACCOUNT_RECOVERY: '/account-recovery',
	FORGOT_USERNAME: '/account-recovery/forgot-username',
	RESET_PASSWORD: '/account-recovery/reset-password',
	RESET_PASSWORD_EMAIL_SENT: '/account-recovery/reset-password/email-sent',
	RESET_PASSWORD_SMS_FORM: '/account-recovery/reset-password/sms-form',
	RESET_PASSWORD_TRANSACTION_ID: '/account-recovery/reset-password/transaction-id',
	RESET_PASSWORD_CONFIRM: '/account-recovery/reset-password/confirm',
};

export default function( router ) {
	// Main route for account recovery is the lost password page
	router( routes.ACCOUNT_RECOVERY, redirectLoggedIn, lostPassword( routes ) );
	router( routes.FORGOT_USERNAME, redirectLoggedIn, forgotUsername );
	router( routes.RESET_PASSWORD, redirectLoggedIn, resetPassword );
	router( routes.RESET_PASSWORD_EMAIL_SENT, redirectLoggedIn, resetPasswordEmailForm );
	router( routes.RESET_PASSWORD_SMS_FORM, redirectLoggedIn, resetPasswordSmsForm );
	router( routes.RESET_PASSWORD_TRANSACTION_ID, redirectLoggedIn, resetPasswordByTransactionId );
	router( routes.RESET_PASSWORD_CONFIRM, redirectLoggedIn, resetPasswordConfirmForm );
}
