const path = require("path");
const Dotenv = require('dotenv-webpack');


module.exports = {
	cache: false,
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "index.bundle.js",
		clean: true,
		assetModuleFilename: "src/assets/[name].[ext]",
	},
	devServer: {
		port: 3000,
		watchFiles: ["src/*.html"],
		hot: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.(css|scss)$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: "file-loader",
			},
		],
	},
	target: "web",
	plugins: [new Dotenv()],
};
