const path = require('path');

module.exports = () => ({
  devServer: {
    contentBase: [
      path.resolve(__dirname, './../'),
    ],
    disableHostCheck: true,
    writeToDisk: true,
  },
  devtool: 'inline-source-map',
});
