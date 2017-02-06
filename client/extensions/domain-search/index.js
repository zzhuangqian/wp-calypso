/**
 * External dependencies
 */
import page from 'page';
import React from 'react';

/**
 * Internal dependencies
 */
import DomanSearch from './domain-search';
import { renderPage } from 'lib/react-helpers';
import { setSection } from 'state/ui/actions';

const render = ( context ) => {
	context.store.dispatch( setSection( null, { hasSidebar: false } ) );

	renderPage( (
		<div>
			<DomanSearch />
		</div>
	), context );
};

export default function() {
	page( '/domain-search', render );
}
