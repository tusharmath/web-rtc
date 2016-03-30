module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  devtool: '#inline-source-map',
  devServer: {contentBase: './public'}
}
