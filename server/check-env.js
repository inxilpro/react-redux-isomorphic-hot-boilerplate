'use strict';

const path = require('path');

// Check that NODE_PATH is set. This must be done before the node binary runs,
// so you can't get away with setting process.env.NODE_PATH
const rootPath = path.resolve(__dirname, '..');
if (!process.env.NODE_PATH || path.resolve(process.env.NODE_PATH) !== rootPath) {
	console.error('NODE_PATH environmental variable must be set to "%s"', rootPath);
	process.exit(1);
}

// Check that NODE_ENV is set
if (!process.env.NODE_ENV) {
	console.error('NODE_ENV environmental variable must be set');
	process.exit(2);
}

// Check that PORT is set (defaults to 3000)
if (!process.env.PORT) {
	console.warn('PORT environmental variable should be set.');
}
