/**
 * External dependencies
 */
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import intersection from 'lodash/intersection';
import React, { Component } from 'react';
import i18n from 'i18n-calypso';
import inherits from 'inherits';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import style from './styles';
import wpcom from 'lib/wp';

const domains = wpcom.domains();

function ValidationError( code ) {
	this.code = code;
	this.message = code;
}

inherits( ValidationError, Error );

function canRegister( domainName, onComplete ) {
	if ( ! domainName ) {
		onComplete( new ValidationError( 'empty_query' ) );
		return;
	}

	wpcom.undocumented().isDomainAllTLDsAvailable( domainName, function( serverError, data ) {
		if ( serverError ) {
			onComplete( new ValidationError( serverError.error ) );
			return;
		}

		onComplete( null, data );
		return;
	} );
}

const toptlds = [ // Sorted by gTLD, then popularity https://w3techs.com/technologies/overview/top_level_domain/all
	'com', 'org', 'net', 'info', 'co'
];

const othertlds = [ // Sorted by gTLD, then popularity https://w3techs.com/technologies/overview/top_level_domain/all
	'tv', 'me', 'biz', 'blog', 'coffee', 'fm', 'mx', 'live', 'mobi', 'wtf', 'in', 'nl', 'es', 'be', 'com.br', 'net.br', 'wales'
];

const tlds = toptlds.concat( othertlds );

const prefixes = [ 'my', 'the', 'web', 'go' ];

const sufixes = [ 'online', 'web', 'media', 'world', 'net' ];

class Suggestion extends Component {
	selectSuggestion = () => {
		const domainName = this.props.domainName.split( '.' );
		this.props.changeSearch( domainName[ 0 ] );
	}

	render() {
		return (
			<span><a className={ style.suggestion } onClick={ this.selectSuggestion }>{ this.props.domainName }</a> </span>
		);
	}
}

class DomanSearch extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			domainSearch: [],
			searchResults: {},
			suggestions: {},
			loadMore: false,
			searchQuery: '',
			mostRecentSearchQuery: ''
		};

		this.onSearchDebounced = debounce( this.onSearch, 300 );
	}

	onSearchChange = ( event ) => {
		const searchQuery = event.target.value;

		this.setState( {
			searchQuery: searchQuery,
			loadMore: false
		} );

		this.onSearchDebounced();
	}

	onSearch = () => {
		const searchQuery = this.state.searchQuery;

		if ( this.state.searchResults[ searchQuery ] ) {
			return; // we already have results
		}

		canRegister( searchQuery, ( error, result ) => {
			const searchResults = this.state.searchResults;

			tlds.some( ( tld ) => {
				if ( result && result[ tld ] ) {
					result[ tld ].bestMatch = true;
					return true;
				}
			} );

			searchResults[ searchQuery ] = result;

			this.setState( {
				searchResults: searchResults
			} );
		} );

		domains.suggestions( {
			query: searchQuery,
			quantity: 10,
			vendor: 'domainsbot',
			includeSubdomain: false
		} ).then( domainSuggestions => {
			const suggestions = this.state.suggestions;

			suggestions[ searchQuery ] = domainSuggestions;

			this.setState( {
				suggestions: suggestions,
				mostRecentSearchQuery: searchQuery
			} );
		} );
	}

	isDomainAvailable( searchQuery, tld ) {
		if ( this.state.searchResults[ searchQuery ] ) {
			if ( this.state.searchResults[ searchQuery ][ tld ] ) {
				return true;
			}

			return false;
		}

		return false;
	}

	getResults( searchQuery, tld ) {
		if ( this.state.searchResults[ searchQuery ] ) {
			if ( this.state.searchResults[ searchQuery ][ tld ] ) {
				const details = this.state.searchResults[ searchQuery ][ tld ];
				return (
					<div>
						<span style={ { fontSize: '16px' } }>{ details[ 2 ] }</span><span style={ { color: '#87A6BC', fontSize: '14px' } }>/year</span>
					</div>
				);
			}

			return <div>Taken</div>;
		}

		return null;
	}

	getTLD( tld, index ) {
		const styles = {};
		let color = '#2E4453',
			recommended,
			href;
		if ( ! this.state.searchResults[ this.state.searchQuery ] ) {
			styles.animation = 'loading-fade 1.6s ease-in-out infinite';
			color = '#87A6BC';
		} else if ( ! this.isDomainAvailable( this.state.searchQuery, tld ) ) {
			color = '#87A6BC';
		} else if ( this.state.searchResults[ this.state.searchQuery ][ tld ] &&
			this.state.searchResults[ this.state.searchQuery ][ tld ].bestMatch ) {
			recommended = ( <span className={ style.recommended }>Recommended</span> );
			href = '/start/domain-first?new=' + this.state.searchQuery + '.' + tld;
		} else {
			href = '/start/domain-first?new=' + this.state.searchQuery + '.' + tld;
		}

		styles.color = color;
		const className = classnames( style.result, 'is-compact' );

		return (
			<Card key={ index } className={ className } style={ styles } href={ href }>
				{ this.state.searchQuery + '.' + tld }
				{ recommended }
				<div style={ { 'float': 'right' } }>
					{ this.getResults( this.state.searchQuery, tld ) }
				</div>
			</Card>
		);
	}

	getPrefix( fix, index ) {
		const styles = { clear: 'both', lineHeight: '40px', fontSize: '24px', padding: '10px' };
		styles.animation = 'loading-fade 1.6s ease-in-out infinite';
		styles.color = '#aaa';
		if ( true ) {
			return null;
		}

		return (
			<div key={ index } style={ styles }>
				{ fix + this.state.searchQuery + '.com' }
				<div style={ { 'float': 'right' } }>
					<Button disabled style={ styles }>&nbsp;</Button>
				</div>
			</div>
		);
	}

	getSufix( fix, index ) {
		const styles = { clear: 'both', lineHeight: '40px', fontSize: '24px', padding: '10px' };
		styles.animation = 'loading-fade 1.6s ease-in-out infinite';
		styles.color = '#aaa';
		if ( true ) {
			return null;
		}

		return (
			<div key={ index } style={ styles }>
				{ this.state.searchQuery + fix + '.com' }
				<div style={ { 'float': 'right' } }>
					<Button disabled style={ styles }>&nbsp;</Button>
				</div>
			</div>
		);
	}

	changeSearch = ( domainName ) => {
		this.setState( {
			searchQuery: domainName
		}, () => {
			this.onSearch();
		} );
	}

	ideas() {
		if ( this.state.suggestions[ this.state.mostRecentSearchQuery ] ) {
			const suggestionText = this.state.suggestions[ this.state.mostRecentSearchQuery ].map( ( suggestion ) => {
				return suggestion.domain_name.split( '.' )[ 0 ];
			} );

			const uniqueSuggestions = intersection( suggestionText );

			const ideas = uniqueSuggestions.map( ( suggestion, index ) => {
				return (
					<Suggestion
						key={ index }
						domainName={ suggestion }
						changeSearch={ this.changeSearch } />
				);
			} );
			return (
				<div className={ style.ideas }>
					More ideas: { ideas }
				</div>
			);
		}

		return null;
	}

	getSuggestions() {
		if ( ! this.state.suggestions[ this.state.mostRecentSearchQuery ] ) {
			return null;
		}

		const className = classnames( style.result, 'is-compact' );
		const suggestions = this.state.suggestions[ this.state.mostRecentSearchQuery ].map( ( suggestion, index ) => {
			const href = '/start/domain-first?new=' + suggestion.domain_name;
			let bestAlternative;
			if ( index === 0 ) {
				bestAlternative = ( <span className={ style.bestAlternative }>Best Alternative</span> );
			}
			return (
				<Card key={ index } className={ className } href={ href } style={ { color: '#2E4453' } }>
					{ suggestion.domain_name } { bestAlternative }
					<div style={ { 'float': 'right' } }>
						<div>
							<span style={ { fontSize: '16px' } }>{ suggestion.cost }</span><span style={ { color: '#87A6BC', fontSize: '14px' } }>/year</span>
						</div>
					</div>
				</Card>
			);
		} );

		return (
			<div>
				{ suggestions }
				<Card className="is-compact" style={ { textAlign: 'center' } }>
					<a href="#" onClick={ this.showMoreSuggestions }>Show more alternative suggestions</a>
				</Card>
			</div>
		);
	}

	showMoreSuggestions( event ) {
		event.preventDefault();
	}

	loadMore = () => {
		this.setState( { loadMore: true } );
	}

	render() {
		return (
			<div className={ style.background }>
				<div className={ style.title }>Your next big idea starts here</div>
				<div className={ style.tagline }>Find the domain that defines you</div>
				<div className={ style.searchInput }>
					<input
						type="search"
						placeholder={ i18n.translate( 'Enter a domain or keyword', { textOnly: true } ) }
						autoFocus={ true }
						onChange={ this.onSearchChange }
						dir="ltr"
						value={ this.state.searchQuery }
					/>
					<div>{ this.ideas() }</div>
				</div>

				<div>
					{ this.state.searchQuery && toptlds.map( ( tld, index ) => ( this.getTLD( tld, index ) ) ) }
					{ this.state.searchQuery && prefixes.map( ( prefix, index ) => ( this.getPrefix( prefix, index ) ) ) }
					{ this.state.searchQuery && sufixes.map( ( sufix, index ) => ( this.getSufix( sufix, index ) ) ) }
					{
						this.state.searchQuery &&
						! this.state.loadMore &&
						( <div className={ style.seeMore }>Looking for a specific domain? <a onClick={ this.loadMore }>Show more exact matches</a></div> )
					}
					{
						this.state.loadMore &&
						this.state.searchQuery && othertlds.map( ( tld, index ) => ( this.getTLD( tld, index ) ) )
					}

					{ this.getSuggestions() }
				</div>
			</div>
		);
	}
}

export default withStyles( style )( DomanSearch );
