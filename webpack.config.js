const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		main: ['./js/main.js', './sass/style.scss'],
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							modules: false,
							localIdentName: "[local]___[hash:base64:5]"
						}
					},
					{
						loader: 'sass-loader',
						options: {
							importer: globImporter()
						}
					}
				]
			}
		],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].min.js",
		publicPath: '/assets/'
	},
	plugins: [
		new MiniCssExtractPlugin()
	]
};
