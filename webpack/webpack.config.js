const merge = require('webpack-merge');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const paths = require('./extension/paths.ext');
const extensionsDevelopment = require('./extension/extensions.development');
const extensionsProduction = require('./extension/extensions.production');

const isProduction = process.argv.indexOf('production') >= 0;

const getConfig = (name) => {
  return {
    context: paths.src,
    entry: {},
    node: {
      fs: 'empty',
      net: 'empty'
    },
    target: 'web',
    output: {
      path: paths.build,
      filename: '[name]/app' + name + '.js',
      publicPath: '/dist',
      sourceMapFilename: '[name]/app' + name + '.map'
    },
    resolve: {
      extensions: ['.js'],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      alias: {
        'app': paths.src
      }
    },
    plugins: [
      new WebpackCleanupPlugin()
    ],
    optimization: {
      minimize: false,
      runtimeChunk: {name: 'common'},
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /\.js?$/,
            chunks: 'all',
            minChunks: 2,
            name: 'common',
            enforce: true,
          },
        },
      },
    }
  };
};

module.exports = function () {
  let config = [];
  let list = [''];

  list.forEach((key) => {
    config.push(merge([
      getConfig(key),
      isProduction ? extensionsProduction : extensionsDevelopment
    ]));
  });

  return config;
};
