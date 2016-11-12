module.exports = {
  entry: "./src/app.js",
  output: {path: __dirname, filename: './dist/bundle.js'},
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [{
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
}
