'use strict'

const path = require('path')

module.exports = {
  entry: path.join(__dirname, './static/scripts/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './static/scripts/bin')
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  }
}
