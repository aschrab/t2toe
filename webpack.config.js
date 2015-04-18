//var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

var HTML = require('html-webpack-plugin');

html = new HTML({
	title: "T2Toe",
	template: "source/templates/react.html"
});

module.exports = {
	target: "web",
	debug: true,
	devtool: "source-map",
	entry: {
		main: [ "webpack/hot/dev-server", "./source/main" ]
	},
	output: {
		path: "./build",
		filename: "[hash].bundle.js"
	},
	resolve: {
		modulesDirectories: ['bower_components', 'node_modules'],
	},
	module: {
		loaders: [
			{ test: /\.svg$/, loaders: [
				'file?hash=sha512&digest=hex&name=[hash].[ext]'
				,'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
			] },
			{ test: /\.css/, loader: "style-loader!css-loader" },
			{ test: /\.js$/, loader: "jsx-loader?harmony" },
			{ test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" }
		]
	},
	plugins: [
		html
		//new UglifyJsPlugin()
	]
};
