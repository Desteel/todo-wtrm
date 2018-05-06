const paths = require('./paths.ext');

module.exports = {
  devServer: {
    contentBase: paths.server,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  },
  devtool: 'cheap-module-eval-source-map'
};
