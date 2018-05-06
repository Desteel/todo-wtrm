const paths = require('./paths.ext');
const isProduction = process.argv.indexOf('production') >= 0;

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  }
};
