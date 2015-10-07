'use strict';

// Check environment
require('./check-env');

// Set up Babel
require('babel/register');

// Register feature flags
global.__DEV__ = ('development' === process.env.NODE_ENV);
global.__ON_SERVER__ = true;
global.__ON_CLIENT__ = false;

// Express app
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
var app = express();

// Middleware
const staticDir = path.join(__dirname, '..', 'client', 'static');
app.use(favicon(staticDir + '/favicon.ico'));
app.use(express.static(staticDir));

// Environment
if (__DEV__) {
	// Dev environment
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');
	const webpackConfig = require('../webpack/config.dev');

	const compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler));
} else {
	// Production environment
	app.use('/static', express.static(path.join(__dirname, '..', 'client', 'dist')));
}

// Everything else renders app
const initialRender = require('./initial-render');
app.get('*', initialRender);

// Not found handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Express error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});

// Listen
const port = process.env.PORT || 3000;
app.listen(port, function(error) {
	if (error) {
		console.error(error);
		return process.exit(3);
	}

	console.info('Listening on port http://localhost:%s.', port);
});

// Export
module.exports = app;
