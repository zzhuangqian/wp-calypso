/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */

const _pluggables = [];

const Pluggables = {
	register: function( key, component ) {
		_pluggables.push( {
			key: key,
			component: component
		} );
	},

	render: function( /* key */ ) {
		// TODO filter on key, handle empty key
		return _pluggables.map( function( pluggable, idx ) {
			return React.createElement( pluggable.component, {
				key: idx,
			} );
		} );
	}
};

module.exports = Pluggables;
