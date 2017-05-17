/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import ui from './ui/reducer';
import wcApi from './wc-api/reducer';
import site from './site/reducer';

export default combineReducers( {
	ui,
	wcApi,
	site,
} );
