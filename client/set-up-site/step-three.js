// External dependencies
import React from 'react';

// Internal dependencies

class StepThree extends React.Component {
	constructor( props ) {
		super( props );

		setTimeout( () => {
			window.stephane = () => {
				document.querySelector( 'div div' ).remove();
				document.querySelector( 'img' ).remove();

				document.body.children[ 0 ].appendChild( document.createElement( 'div' ) );

				document.querySelector( 'div div' ).style = "position: absolute; top: 0; left: 0;";
				document.querySelector( 'div div' ).innerHTML = '<img src="/calypso/images/sidebar.png" style="width: 300px;" />';
				document.querySelector( 'iframe' ).style = 'margin-left: 300px; width: calc( 100% - 300px );';
			};

			document.body.innerHTML = [
				'<div style="background: rgba( 255, 255, 255, 0.5 ); width: 100%; height: 100%;">',
					'<iframe src="https://coffeeshopdemosite123.wordpress.com" width="100%" height="200%"></iframe>',
					'<div style="background: rgba( 255, 255, 255, 0.8 ); top: 0; bottom: 0; left: 0; right: 0; position: fixed;"></div>',
					'<img src="/calypso/images/overlay.png" onclick="javascript:window.stephane();" style="position: absolute; margin: 0 auto; width: 460px; left: 50%; margin-left: -230px; height: 284px; top: 50%; margin-top: -142px;" />',
				'</div>'
			].join( '' );

		}, 3000 );
	}

	render() {
		return (
			<div className="sup">
				<div />
				<h1>We're building your site now.</h1>
				<h2>Give us one minute while we create a beautiful site for you.</h2>
			</div>
		);
	}
}

export default StepThree;
