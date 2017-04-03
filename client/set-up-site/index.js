// External dependencies
import page from 'page';

// Internal dependencies
import { setUp } from './controller';

export default () => {
	page( '/set-up-site/:step?', setUp );
};
