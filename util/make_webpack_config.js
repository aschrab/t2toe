//var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

var HTML = require('html-webpack-plugin');

module.exports = function(options) {
	var conf = {};

	conf.target = "web";
	conf.entry = { main: ["./source/main" ] };
	if (options.devel)
		conf.entry.main.unshift("webpack/hot/only-dev-server");

	conf.output = {
		path: "./build",
		filename: "[hash].bundle.js"
	};

	if (options.devel) {
		conf.debug = true;
		conf.devtool = "source-map";
		conf.devServer = {
			host: "::",
			progress: true,
			colors: true,
		};
	}

	conf.resolve = {
		modulesDirectories: ['node_modules'],
	};

	var loaders = [];
	loaders.push({ test: /\.svg$/, loaders: [
			'file?hash=sha512&digest=hex&name=[hash].[ext]',
			'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
	]});

	loaders.push({ test: /\.css/, loader: "style-loader!css-loader" });

	js_loaders = ["jsx-loader?harmony"];
	//js_loaders.unshift("react-hot");
	loaders.push({ test: /\.js$/, loaders: js_loaders });
	loaders.push({ test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" });

	conf.module = { loaders: loaders };

	conf.plugins = [];
	conf.plugins.push(new HTML({
		title: "T2Toe",
		template: "source/templates/react.html"
	}));
	//conf.plugins.push(new UglifyJsPlugin());

	return conf;
};
