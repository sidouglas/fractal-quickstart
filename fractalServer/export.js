const fs = require('fs-extra')

module.exports = async ({ exportDirectory, fractal, logger }) => {

  await fs.emptydir(exportDirectory)

  fractal.web.set('builder.dest', exportDirectory)

  const builder = fractal.web.builder()

  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'))

  builder.on('error', (err) => logger.error(err.message))

  return builder.build().then(async () => {
    logger.success('Fractal build complete')
  })
}
