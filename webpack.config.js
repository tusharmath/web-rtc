module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devtool: '#inline-source-map',
  devServer: {contentBase: './public'},
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
        }
      }
    ]
  }
}
