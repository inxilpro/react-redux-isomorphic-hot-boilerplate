'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '..', 'client', 'src', 'app')
	],
	output: {
		path: path.join(__dirname, '..', 'client', 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"development"'
			},
			__DEV__: 'true',
			__ON_SERVER__: 'false',
			__ON_CLIENT__: 'true'
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				include: path.join(__dirname, '..'),
				query: {
					"plugins": [
						"react-transform"
					],
					"extra": {
						"react-transform": {
							"transforms": [{
								"transform": "react-transform-hmr",
								"imports": [
									"react",
									"react-dom"
								],
								"locals": [
									"module"
								]
							}, {
								"transform": "react-transform-catch-errors",
								"imports": [
									"react",
									"redbox-react"
								]
							}]
						}
					}
				}
			}
		]
	}
};
