var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'public/js'),
		filename: 'bundle.js',
		publicPath: '/public/js/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		(new webpack.optimize.UglifyJsPlugin({
			minimize: true
		}))
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['react-hot', 'babel'],
			include: path.join(__dirname, 'src')
		}]
	}
};