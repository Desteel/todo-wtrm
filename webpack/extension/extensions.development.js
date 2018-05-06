const merge = require('webpack-merge');
const commonList = require('./extensions.common');
const devserverExt = require('./devserver.ext');

module.exports = merge([
  commonList,
  devserverExt
]);
