/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';
/**
 * Internal dependencies
 */
import config from 'config';
import SectionNav from 'components/section-nav';
import NavTabs from 'components/section-nav/tabs';
import NavItem from 'components/section-nav/item';
import { getSelectedSite } from 'state/ui/selectors';

export class SiteSettingsNavigation extends Component {

	static propTypes = {
		section: PropTypes.string,
		// Connected props
		site: PropTypes.object
	};

	getStrings() {
		const { translate } = this.props;
		return {
			general: translate( 'General', { context: 'settings screen' } ),
			writing: translate( 'Writing', { context: 'settings screen' } ),
			discussion: translate( 'Discussion', { context: 'settings screen' } ),
			traffic: translate( 'Traffic', { context: 'settings screen' } ),
			security: translate( 'Security', { context: 'settings screen' } ),
			'import': translate( 'Import', { context: 'settings screen' } ),
			'export': translate( 'Export', { context: 'settings screen' } ),
		};
	}

	getImportPath = () => {
		const { site } = this.props,
			path = '/settings/import';

		if ( site.jetpack ) {
			return `${ site.options.admin_url }import.php`;
		}

		return [ path, site.slug ].join( '/' );
	};

	getExportPath = () => {
		const { site } = this.props;
		return site.jetpack
			? `${ site.options.admin_url }export.php`
			: `/settings/export/${ site.slug }`;
	};

	render() {
		const { section, site } = this.props;
		const strings = this.getStrings();
		const selectedText = strings[ section ];

		if ( ! site ) {
			return ( <SectionNav /> );
		}

		if ( section === 'guidedTransfer' ) {
			// Dont show the navigation for guided transfer since it includes its own back navigation
			return null;
		}

		return (
			<SectionNav selectedText={ selectedText } >
				<NavTabs>
					<NavItem
						path={ `/settings/general/${ site.slug }` }
						selected={ section === 'general' } >
							{ strings.general }
					</NavItem>

					<NavItem
						path={ `/settings/writing/${ site.slug }` }
						preloadSectionName="settings-writing"
						selected={ section === 'writing' } >
							{ strings.writing }
					</NavItem>

					<NavItem
						path={ `/settings/discussion/${ site.slug }` }
						preloadSectionName="settings-discussion"
						selected={ section === 'discussion' } >
							{ strings.discussion }
					</NavItem>

					<NavItem
						path={ `/settings/traffic/${ site.slug }` }
						preloadSectionName="settings-traffic"
						selected={ section === 'traffic' }
					>
						{ strings.traffic }
					</NavItem>

					{
						config.isEnabled( 'manage/security' ) && site.jetpack &&
							<NavItem path={ `/settings/security/${ site.slug }` }
							preloadSectionName="settings-security"
							selected={ section === 'security' } >
								{ strings.security }
						</NavItem>
					}

					<NavItem
						path={ this.getImportPath() }
						selected={ section === 'import' }
						isExternalLink={ !! site.jetpack } >
							{ strings.import }
					</NavItem>

					{
						config.isEnabled( 'manage/export' ) &&
							<NavItem
								path={ this.getExportPath() }
								selected={ section === 'export' }
								isExternalLink={ !! site.jetpack } >
									{ strings.export }
							</NavItem>
					}
				</NavTabs>
			</SectionNav>
		);
	}
}

export default connect(
	state => ( {
		site: getSelectedSite( state )
	} )
)( localize( SiteSettingsNavigation ) );
