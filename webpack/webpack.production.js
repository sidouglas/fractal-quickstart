module.exports = () => ({
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [],
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  },
})
