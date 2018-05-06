const merge = require('webpack-merge');
const commonList = require('./extensions.common');
const uglifyjsExt = require('./uglifyjs.ext');

module.exports = merge([
  commonList,
  uglifyjsExt
]);
