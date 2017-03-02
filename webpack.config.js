var path = require('path');
var webpack = require("webpack");

module.exports = {
  	entry: './src/index.js',
  	output: {
    	filename: 'app.js',
    	path: path.resolve(__dirname, 'dist')
  	},
  	module: {
  		rules: [
  			{ test: /\.js$/, exclude: /node_modules/, use: [{loader: "babel-loader"}] },
        { test: /\.scss$/, exclude: /node_modules/, 
          use: 
          [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader" }
          ]
        }
  		]
  	}
};