const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'olMapExport.js',
    library: {
      name: 'olMapExport',
      type: 'umd'
    }

  },
  devtool: 'inline-source-map'
}