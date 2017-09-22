module.exports = {
  entry: './static/scripts/app.js',
  output: {
    filename: 'scripts.bundle.js',
    path: 'static/scripts/dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  }
}
