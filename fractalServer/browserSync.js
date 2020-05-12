const webpackConfig = require('./../webpack.config')({ mode: 'development' })

const compiler = require('webpack')(webpackConfig)

// devServer options seems to have little effect on browser sync.
const devMiddleware = require('webpack-dev-middleware')(compiler, webpackConfig.devServer)
const hotMiddleware = require('webpack-hot-middleware')(compiler)
const proxyMiddleware = require('./proxyMiddleware')

module.exports = ({ port }) => {
  return {
    codeSync: true,
    cors: true,
    injectChanges: true,
    logLevel: 'info', // debug | info | silent
    middleware: [
      devMiddleware,
      hotMiddleware,
      //seems that the real fractal server just concats 1 to the port
      ...proxyMiddleware({ fractalServerUrl: `http://localhost:${port}1` }),
    ],
    open: false,
    watchOptions: {
      /*
         fractal is going to try and reload everything - because we set it too look at
         the project root.
         We want to have proper css injection ( not browser reload ) so:
         when app.js is changed even if a css/scss edit happens - so ignore those changes
         we don't care if a scss file is changed, we'll look only the app.css file instead.
         Css changes by default are injected by browserSync.
      */
      ignored: [
        '**/dist/app.js',
        '**/src/**/*.scss'
      ],
      ignoreInitial: true,
    },
    files: '**/dist/app.css'
  }
}
