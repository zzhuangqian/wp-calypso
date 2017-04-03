// External dependencies
import page from 'page';

// Internal dependencies
import { start } from './controller';

export default () => {
	page( '/set-up-site/:step?', start );
};
