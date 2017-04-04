// External dependencies
import React from 'react';

// Internal dependencies
import Button from 'components/button';
import { find } from 'lodash';
import { suggestions, place } from './step-two-data';
import Card from 'components/card';
import CompactCard from 'components/card/compact';
import Gridicon from 'gridicons';

class StepTwo extends React.Component {
	constructor( props ) {
		super( props );

		this.handleChange = this.handleChange.bind( this );

		this.state = {
			inputValue: '',
			results: [],
			confirm: false,
		};
	}

	handleClickReset( event ) {
		event.preventDefault();

		this.setState( { inputValue: '', results: [], confirm: false } );
	}

	handleChange( event ) {
		const inputValue = event.target.value;

		const results = suggestions.predictions.filter( prediction => {
			return find( prediction.terms, term => {
				return inputValue.length > 2 && term.value.toLowerCase().indexOf( inputValue.toLowerCase() ) === 0;
			} );
		} );

		this.setState( { inputValue, results, confirm: false } );
	}

	handleClickSuggestion( inputValue ) {
		this.setState( { inputValue, confirm: true } );
	}

	render() {
		return (
			<div>
				<div className="set-up-site__header">
					<h1>Alright, where can we find your business?</h1>
					<h2>We'll use any public information we can find to give you a head start on your site.</h2>
				</div>

				<strong>Find your business:</strong>

				<input
					autoFocus
					type="text"
					value={ this.state.inputValue }
					onChange={ this.handleChange } />

				{ ! this.state.confirm && this.state.results.map( ( result, index ) => (
					<CompactCard
						key={ result.id }
						className="set-up-site__suggestion"
						onClick={ this.handleClickSuggestion.bind( this, result.description ) }>
						<div className="set-up-site__main-text">{ result.structured_formatting.main_text }</div>
						<div className="set-up-site__secondary-text">{ result.structured_formatting.secondary_text }</div>
					</CompactCard>
				) ) }

				{ this.state.inputValue.length > 30 && (
					<div className="set-up-domain__confirm-container">
						<h3>Does this information look right?</h3>
						<div className="set-up-domain__confirm">
							<div>
								<div className="set-up-site__icon" />
								<div className="set-up-site__name">
									<h1>{ place.result.name }</h1>
									<h2>Cafe</h2>
								</div>
							</div>
							<div>
								<div className="set-up-site__address">
									<Gridicon icon="location" />
									<div>
										{ place.result.formatted_address }
									</div>
								</div>
								<div className="set-up-site__hours">
									<Gridicon icon="time" />
									<div>
										{ place.result.opening_hours.weekday_text.map( n => <div>{ n }</div> ) }
									</div>
								</div>
							</div>
							<div>
								<Button primary href="/set-up-site/three">This is it!</Button>
								<p>You can edit this information later if you want.</p>
								<p>Not the right business? <a href="#" onClick={ this.handleClickReset.bind( this ) }>Try another search</a>.</p>
							</div>
						</div>
					</div>
				) }

				<a className="set-up-site__back" href="/set-up-site">Back</a>
			</div>
		);
	}
}

export default StepTwo;
