/**
 * @param {Object} state Global app state
 * @return {Object} An object containing all the user data using in the password reset request.
 */
export default ( state ) => {
	return state.accountRecovery.reset.userData;
};
