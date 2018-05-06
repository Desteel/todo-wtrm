const path = require('path');

const changeDir = (dir) => {
  let result = {};

  if (typeof dir === 'object') {
    for (let key in dir) {
      if (!dir.hasOwnProperty(key)) {
        continue;
      }

      result[key] = changeDir(dir[key]);
    }
  } else if (typeof dir === 'string') {
    result = path.join(__dirname, dir.replace('./', ''));
  }

  return result;
};

const paths = {
  root: './../../',
  build: './../../dist/',
  src: './../../src/',
  server: './../../'
};

module.exports = changeDir(paths);
