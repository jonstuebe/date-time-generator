var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

var config = function(){

  var env = process.env.NODE_ENV || 'dev';
  var port = 4000;

  var getEntry = function() {
    if(env == 'production')
    {
      return path.resolve(__dirname, 'src/index');
    }
    else
    {
      return [
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        './src/index'
      ];
    }
  }

  var getPublicPath = function() {
    if(env == 'production')
    {
      return __dirname;
    }
    else
    {
      return '/static/';
    }
  }

  var getPlugins = function() {
    if(env == 'production')
    {
      return [ new ExtractTextPlugin("[name].css") ];
    }
    else
    {
      return [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("[name].css"),
        new webpack.NoErrorsPlugin(),
      ]
    }
  }

  var getSassLoader = function() {
    var _loader = 'style!css!sass';

    if(env == 'production')
    {
      _loader = ExtractTextPlugin.extract('style','css!sass');
    }

    return _loader;
  }

  return {
    context: __dirname,
    entry: getEntry(),
    devtool: 'cheap-module-eval-source-map',
    output: {
      publicPath: getPublicPath(),
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel']
      },

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader","css-loader")
      },

      // SASS
      {
        test: /\.scss$/,
        loader: getSassLoader()
      }]
    },
    plugins: getPlugins()
  }

}

module.exports = config();
