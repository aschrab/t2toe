//var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

module.exports = {
	target: "web",
	debug: true,
	devtool: "source-map",
	entry: {
		main: [ "webpack/hot/dev-server", "./source/main" ]
	},
	output: {
		path: "./build",
		filename: "[name].bundle.js"
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
		//new UglifyJsPlugin()
	]
};
