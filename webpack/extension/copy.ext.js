const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths.ext');

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: paths.src + 'assets',
        to: paths.build + 'assets'
      }
    ])
  ],
};
