const merge = require('webpack-merge');
const entries = require('./../entries');
const imagesExt = require('./images.ext');
const copyExt = require('./copy.ext');
const tsExt = require('./typescript.ext');

module.exports = merge([
  entries,
  tsExt,
  imagesExt,
  copyExt
]);
