'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: [
		path.join(__dirname, '..', 'client', 'src', 'app')
	],
	output: {
		path: path.join(__dirname, '..', 'client', 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			},
			__DEV__: 'false',
			__ON_SERVER__: 'false',
			__ON_CLIENT__: 'true'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/,
				include: path.join(__dirname, '..')
			}
		]
	}
};
