let Webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');
let webpackPlugin = require('../webpack.config.js');

module.exports = function() {
  let compiler = Webpack(webpackPlugin);
  compiler.plugin('compile', () => {
    console.log('Buldling ...');
  });

  compiler.plugin('done', function() {
    console.log('Bundling done.');
  });

  let bundler = new WebpackDevServer(compiler, {
    publicPath: '/dist/',
    hot: true
  });

  bundler.listen(8888, 'localhost', () => {
    console.log('Building project, please wait ...');
  })
}
