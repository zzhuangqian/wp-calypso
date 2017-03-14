/**
 * External dependencies
 */
import { expect } from 'chai';
import { spy } from 'sinon';

/**
 * Internal dependencies
 */
import { http } from 'state/data-layer/wpcom-http/actions';
import {
	receiveSiteSettings as receiveSiteSettingsAction,
	siteSettingsRequestFailure,
	siteSettingsRequestSuccess,
} from 'state/site-settings/actions';
import {
	receiveSiteSettings,
	receiveError,
	requestSiteSettings,
} from '../';

import { WPCOM_RESPONSE } from 'state/site-settings/test/fixture';

describe( 'wpcom-api', () => {
	describe( 'site-settings request', () => {
		describe( '#requestSiteSettings', () => {
			it( 'should dispatch HTTP request to site-settings endpoint', () => {
				const siteId = 123456;
				const action = { type: 'DUMMY', siteId };
				const dispatch = spy();
				const next = spy();

				requestSiteSettings( { dispatch }, action, next );

				expect( dispatch ).to.have.been.calledOnce;
				expect( dispatch ).to.have.been.calledWith( http( {
					apiVersion: '1.4',
					method: 'GET',
					path: `/sites/${ siteId }/settings`,
					onSuccess: action,
					onFailure: action,
				} ) );
			} );

			it( 'should pass the original action along the middleware chain', () => {
				const siteId = 123456;
				const action = { type: 'DUMMY', siteId };
				const dispatch = spy();
				const next = spy();

				requestSiteSettings( { dispatch }, action, next );

				expect( next ).to.have.been.calledWith( action );
			} );
		} );

		describe( '#receiveSiteSettings', () => {
			it( 'should dispatch site Receive and request success', () => {
				const settings = WPCOM_RESPONSE;
				const siteId = 123456;
				const action = receiveSiteSettingsAction( siteId, settings );
				const dispatch = spy();
				const next = spy();

				receiveSiteSettings( { dispatch }, action, next, siteId, settings );

				expect( dispatch ).to.have.been.calledTwice;
				expect( dispatch ).to.have.been.calledWith( siteSettingsRequestSuccess( siteId ) );
				expect( dispatch ).to.have.been.calledWith( receiveSiteSettingsAction( siteId, settings ) );
			} );
		} );

		describe( '#receiveError', () => {
			it( 'should dispatch error', () => {
				const siteId = 123456;
				const error = 'could not find site settings';
				const action = siteSettingsRequestFailure( siteId, error );
				const dispatch = spy();
				const next = spy();

				receiveError( { dispatch }, action, next, siteId, error );

				expect( dispatch ).to.have.been.calledOnce;
				expect( dispatch ).to.have.been.calledWith( siteSettingsRequestFailure( siteId, error ) );
			} );
		} );
	} );
} );
