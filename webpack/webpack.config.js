const merge = require('webpack-merge');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const paths = require('./extension/paths.ext');
const uglifyjsExt = require('./extension/uglifyjs.ext');
const extensionsDevelopment = require('./extension/extensions.development');
const extensionsProduction = require('./extension/extensions.production');

const getConfig = (name) => {
  let uglify = name.indexOf('min') > -1;

  let common = {
    context: paths.src,
    entry: {},
    node: {
      fs: 'empty',
      process: false
    },
    target: 'web',
    output: {
      path: paths.build,
      filename: '[name]/app' + name + '.js',
      publicPath: '/dist',
      sourceMapFilename: '[name]/app' + name + '.map'
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      alias: {
        'app': paths.src
      }
    },
    plugins: [
      new WebpackCleanupPlugin(),
    ],
    optimization: {
      minimize: false,
      runtimeChunk: { name: 'common' },
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
    },
    devtool: 'cheap-module-eval-source-map'
  };

  if (uglify) {
    common = merge([common, uglifyjsExt]);
  }

  return common;
};

module.exports = function () {
  let config = [];
  let list = [''];

  if (process.env.NODE_ENV === 'production') {
    list.push('.min');
  }

  list.forEach((key) => {
    config.push(merge([
      getConfig(key),
      (process.env.NODE_ENV === 'development') ? extensionsDevelopment : extensionsProduction
    ]));
  });

  return config;
};
