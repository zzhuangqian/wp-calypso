export default ( file, { jscodeshift: j } ) => {
	const root = j( file.source );

	return root.toSource( { quote: 'single' } );
};
