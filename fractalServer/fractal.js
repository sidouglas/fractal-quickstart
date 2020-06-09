const fractalSyncPort = process.env.npm_package_config_fractal_port
const projectName = process.env.npm_package_config_fractal_projectName

const path = require('path')
const buildDir = path.resolve(__dirname, '../dist')
const exportDirectory = path.resolve(__dirname, './../export')
const fractalExport = require('./export')
const fs = require('fs-extra')

const fractal = module.exports = require('@frctl/fractal').create()
const logger = fractal.cli.console

require('./preServe.js')({ port: fractalSyncPort, buildDir })
require('./theme.js')(fractal)

fractal.set('project.title', projectName)

//Tell Fractal where to look for components.
fractal.components.set('path', path.join(__dirname, './../src'))

fractal.docs.set('path', path.join(__dirname, './../src/docs'))

// Tell the Fractal where to look for static assets
fractal.web.set('static.path', path.join(__dirname, './../src/'))

fractal.components.set('default.preview', '@preview')

fractal.web.set('server.syncOptions', require('./browserSync')({ port: fractalSyncPort }))

//Tell Fractal where to use handlebars for templating
const handlebars = require('./handlebars')

fractal.components.engine(handlebars)

fractal.docs.engine(handlebars)

if (process.argv.includes('export')) {
  fractalExport({ exportDirectory, fractal, logger }).then(() => {
    fs.copySync(buildDir, exportDirectory)
    process.exit()
  })
} else {

  const server = fractal.web.server({
    port: fractalSyncPort,
    sync: true,
    watch: true,
  })

  server.start().then(() => {
    logger.log(`\
─────────────────────────────────────────
Fractal web UI server is running!
Use ^C to stop the server.
─────────────────────────────────────────
  `)
  })
}


