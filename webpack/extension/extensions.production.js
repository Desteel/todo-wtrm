const merge = require('webpack-merge');
const commonList = require('./extensions.common');
const babelExt = require('./babel.ext');

module.exports = merge([
  commonList,
  babelExt
]);
