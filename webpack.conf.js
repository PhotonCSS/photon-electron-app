const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackInjectStringPlugin = require("html-webpack-inject-string-plugin");
const { EnvironmentPlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const manifest = require("./web-app.json");

module.exports = {
	target: "node",
	entry: "./src/index.js",
	output: {
		path: __dirname + "/asar_unpacked",
		filename: "app.js"
	},
    module: {
        rules: [
			{
	            test: /\.js$/,
	            //exclude: /(node_modules)/,
	            use: {
	                loader: "babel-loader",
	                options: {
	                    presets: [ "@babel/preset-react", "@babel/preset-env" ],
						plugins: [ "@babel/plugin-proposal-class-properties" ]
	                }
	            }
	        }, {
				test: /\.css/i,
				use: [ MiniCssExtractPlugin.loader, "css-loader" ]
	        }, {
				test: /\.less/i,
				use: [ MiniCssExtractPlugin.loader, "css-loader", "less-loader" ]
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [{
					loader: "file-loader",
					options: { name: "static/[contenthash].[ext]" }
				}]
			}, {
				include: path.join(__dirname, "src/static"),
				use: [{
					loader: "file-loader",
					options: { name: "static/[contenthash].[ext]" }
				}]
			}, {
				test: /\.(txt|md|pem|raw)$/,
				use: [ "raw-loader" ]
			}
		]
    },

  	plugins: [
		new CleanWebpackPlugin(),
    	new HtmlWebpackPlugin({
			meta: {
				"viewport": "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0",
				"theme-color": manifest.config.theme_color
			},
			script: manifest.config.start_url,
			title: manifest.config.appName,
			filename: manifest.config.spa_root
		}),
		new htmlWebpackInjectStringPlugin({
            search: "</head>",
            inject: "<script>window.$ = window.jQuery = require('jquery');</script>"
        }),
		new MiniCssExtractPlugin({ filename: "app.css" }),
		new EnvironmentPlugin({ NODE_ENV: "development" })
  	],

	resolve: {
		extensions: [".js"],
        alias: {
            "@photoncss": path.join(__dirname, "./node_modules/photoncss/modules"),
			"components": path.join(__dirname, "./src/components"),
			"static": path.join(__dirname, "./src/static")
        }
    }
};
