const paths = require('./paths.ext');

module.exports = {
  devServer: {
    contentBase: paths.server,
    port: 3000,
    historyApiFallback: {
      disableDotRule: true
    }
  }
};
