var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var sassLoaders = [
    'css-loader',
    'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src'),
    'postcss-loader',
];

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    module: {
        loaders: [{
            test: /\.scss$/,
            // loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
            loader: 'style!css!sass',
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader','css-loader'),
        },
        {
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src'),
        }]
    },
    resolve: {
        extensions: ['', '.js', '.sass'],
        root: [path.join(__dirname, './src')]
    }
};
