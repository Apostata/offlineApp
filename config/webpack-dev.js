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
        filename: '[name]-bunble.js',
        chunkFilename: "[name].js",
        path: path.resolve(__dirname +"../dist"),
        publicPath: '/'
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