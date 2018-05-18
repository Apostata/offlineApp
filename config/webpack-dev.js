const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin =  require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
    name: 'offlineApp',
    entry:{
        main:['./src/main.js']
    },
    output:{
        chunkFilename: "[name].js",
        filename: '[name]-bunble.js',        
        path: path.resolve(__dirname +"../dist"),
        publicPath: '/'
    },

    optimization: {
		splitChunks: {
            automaticNameDelimiter: '-',
			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: 2,
					minSize: 0
                }
			}
		},
		occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
    },
    
    mode: 'development',

    devtool: "source-map",

    devServer:{
        contentBase: 'dist',
        overlay: true,
        //hot: true, //live reoald
        stats:{
            colors: true
        }
    },

    module:{
        rules:[
            {
                test:/\.js$/,
                use:[{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin("[name].css"),

        new HTMLWebpackPlugin({
            template: "./src/index.html",
            inject: true,
            title: "OfflineApp"
        }),
    ]
};

module.exports = webpackConfig;