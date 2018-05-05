const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./extension/paths.ext');

module.exports =  {
  entry: {
    'app': paths.src + 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: paths.root + 'index.html',
      //inject: false,
      chunk: ['index', 'common'],
      template: paths.src + 'index.html'
    })
  ]
};
