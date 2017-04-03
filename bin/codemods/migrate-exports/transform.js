import { error } from '../common/log.js';

/**
 * Updates Node.js module exports:
 *
 *   module.exports = {
 *   module.exports = LoadingPlaceholder;
 *   module.exports = React.createClass( {
 *   module.exports = function() {
 *   ...
 *
 * To follow ES6 modules syntax:
 *
 *   export default {
 *   export default LoadingPlaceholder;
 *   export default React.createClass( {
 *   export default function() {
 *   ...
 *
 * @param {object} file - information about the file being processed
 * @param {object} api - api providing access to jscodeshift
 * @returns {string} - the new content of the file
 */
export default ( file, { jscodeshift: j } ) => {
	const root = j( file.source );

	const expressionStatements = root.find( j.ExpressionStatement, {
		expression: {
			type: 'AssignmentExpression',
			operator: '=',
			left: {
				type: 'MemberExpression',
				object: {
					type: 'Identifier',
					name: 'module'
				},
				property: {
					type: 'Identifier',
					name: 'exports'
				}
			}
		}
	} );

	if ( expressionStatements.size() > 1 ) {
		error( 'Unable to update module exports because of invalid number of exports', file );
	} else {
		expressionStatements.replaceWith( path => {
			const exportDeclaration = j.exportDeclaration( true, path.node.expression.right );

			// Preserves any surrounding comment that was attached to the former module exports
			if ( path.node.comments ) {
				exportDeclaration.comments = path.node.comments;
			}

			return exportDeclaration;
		} );
	}

	return root.toSource( { quote: 'single' } );
};
