export function addImport( root, j, name ) {

}

const findImports = ( root, j, name ) => {
	return root.find( j.ImportDeclaration, {
		source: {
			type: 'Literal',
			value: name
		}
	} );
};

export function replaceImport( root, j ) {

}

export function updateImport( root, j ) {

}
