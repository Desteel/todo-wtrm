const merge = require('webpack-merge');
const entries = require('./../entries');
const imagesExt = require('./images.ext');
const copyExt = require('./copy.ext');

module.exports = merge([
  entries,
  imagesExt,
  copyExt
]);
