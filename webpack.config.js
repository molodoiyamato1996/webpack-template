const path = require('path');
const PugPlugin = require('pug-plugin');

let mode = 'development';

if (process.env.NODE_ENV === 'production') {
	mode = 'production';
}

console.log(mode + 'mode');

module.exports = {
	mode: mode,
	entry: {
		index: './src/views/index.pug', // output index.html
	},
	output: {
		path: path.join(__dirname, 'dist/'),
		publicPath: '/',
		// output filename of JS files
		filename: 'assets/js/[name].[contenthash:8].js',
		clean: true,
	},
	plugins: [
		new PugPlugin({
			pretty: (mode === 'development') ? true : false, // formatting HTML, should be used in development mode only
			extractCss: {
				// output filename of CSS files
				filename: 'assets/css/[name].[contenthash:8].css'
			},
		})
	],
	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: PugPlugin.loader,
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{},
									],
								],
							},
						},
					},
					'sass-loader'
				],
			},
			{
				test: /\.(png|jpg|jpeg|ico)/,
				type: 'asset/resource',
				generator: {
					// output filename of images
					filename: 'assets/img/[name].[hash:8][ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
				type: 'asset/resource',
				generator: {
					// output filename of fonts
					filename: 'assets/fonts/[name][ext][query]',
				},
			},
		],
	}
}