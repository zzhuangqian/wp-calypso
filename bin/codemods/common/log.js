import { resolve } from 'path';

export function error( message, file, nodePath ) {
	if ( file ) {
		const absoluteFilePath = resolve( file.path );

		message += ` in:\n  ${absoluteFilePath}`;

		if ( nodePath ) {
			const { end, start } = nodePath.value.loc;

			let location = `line ${start.line}`;

			if ( start.line !== end.line ) {
				location = `lines ${start.line}-${end.line}`;
			}

			message += ` at ${location}`;
		}
	}

	console.error( `! ${message}` );
}
