var ExtractTextPlugin = require('extract-text-webpack-plugin');
let Webpack = require('webpack');
let path = require('path');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const srcPath = path.resolve(__dirname, 'src', 'app.js');
const distPath = path.resolve(__dirname, 'dist');

const production = false;

module.exports = {
  devtool: 'eval',
  entry: [
    //'webpack/hot/dev-server',
    //'webpack-dev-server/client?http://localhost:8888',
    srcPath
  ],
  output: {
    path: distPath,
    filename: production ? 'bundle.min.js' : 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.js$/,
      exclude: nodeModulesPath,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /.scss$/,
      //loaders: ['style-loader', 'css-loader', 'sass-loader']
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }]
  },
  plugins: production ? [
    //new Webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles/[name].min.css', {
      allChunks: true
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ] : [
    //new Webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles/[name].css', {
      allChunks: true
    })
  ]
};
