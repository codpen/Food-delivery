const merge = require("webpack-merge");
const webpack = require('webpack');

const webpackCommon = require("./webpack.common");

let clientConfig = merge.smart(webpackCommon.clientConfig, {
	mode: 'development',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.s(a|c)ss$/,
				loader: [
					'style-loader',
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devServer: {
		contentBase: './dist/public',
		hot: true,
	},
});

let serverConfig = merge.smart(webpackCommon.serverConfig, {
	mode: 'development',
	devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.s(a|c)ss$/,
				loader: [ 'null-loader' ]
			}
		]
	},
});

module.exports = [
	clientConfig,
	serverConfig
];
