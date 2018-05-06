const paths = require('./paths.ext');

module.exports = {
  devServer: {
    contentBase: paths.server,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    disableHostCheck: true
  },
  devtool: 'cheap-module-eval-source-map'
};
