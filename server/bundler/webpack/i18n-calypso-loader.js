module.exports = function( content ) {
	this.cacheable && this.cacheable();

	if ( this.resource.endsWith( 'node_modules/i18n-calypso/lib/index.js' ) ) {
		return content.replace(
			'	moment.locale( localeSlug );',
			`	// Block injected at build time via i18n-calypso-loader Webpack loader
	if ( window.momentLocale && window.momentLocale[ localeSlug ] ) {
		moment.updateLocale( localeSlug, window.momentLocale[ localeSlug ] );
	}
	moment.locale( localeSlug );`
		);
	}

	return content;
};
