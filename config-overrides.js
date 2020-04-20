const { override } = require('customize-cra');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = override((config) => {
  config.resolve.alias = {
    '@': resolve('src'),
    '@components': resolve('./src/components'),
    '@assets': resolve('./src/assets'),
    '@pages': resolve('./src/pages'),
    '@router': resolve('./src/router'),
  };
  return config;
});
