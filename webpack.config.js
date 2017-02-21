var path = require('path');
var webpack = require("webpack");

module.exports = {
  	entry: './src/index.js',
  	output: {
    	filename: 'app.js',
    	path: path.resolve(__dirname, 'dist')
  	},
  	module: {
  		loaders: [
  			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  		]
  	}
};