const merge = require("webpack-merge");

module.exports = merge(require("./webpack.conf.js"), {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
        port: 8311,
		host: "0.0.0.0",
        contentBase: "./src",
		index: require("./web-app.json").config.spa_root,
        watchContentBase: true,
		writeToDisk: false,
		historyApiFallback: { index: "/" + require("./web-app.json").config.spa_root },
		hot: true,
		stats: {
    		modules: false,
    		cached: false,
    		colors: true,
    		chunk: false
  		}
    }
});
