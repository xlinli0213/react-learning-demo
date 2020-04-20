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
    '@plugins': resolve('./src/plugins'),
  };
  config.module.rules[2].oneOf.unshift({
    test: /\.svg$/,
    // include: resolve('./src/assets/icon'),
    loader: require.resolve('svg-sprite-loader'),
  });
  return config;
});
