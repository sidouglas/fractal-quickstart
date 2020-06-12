const fractalSyncPort = process.env.npm_package_config_fractal_port;
const projectName = process.env.npm_package_config_fractal_projectName;

const path = require("path");
const buildDir = path.resolve(__dirname, "./dist");
const exportDirectory = path.resolve(__dirname, "./export");
const fractalExport = require("./fractalServer/export");
const fs = require("fs-extra");

const fractalConfig = (module.exports = require("@frctl/fractal").create());
const logger = fractalConfig.cli.console;

require("./fractalServer/preServe.js")({ port: fractalSyncPort, buildDir });
require("./fractalServer/theme.js")(fractalConfig);

fractalConfig.set("project.title", projectName);

//Tell Fractal where to look for components.
fractalConfig.components.set("path", path.join(__dirname, "./src"));

fractalConfig.docs.set("path", path.join(__dirname, "./src/docs"));

// Tell the Fractal where to look for static assets
fractalConfig.web.set("static.path", path.join(__dirname, "./src/"));

fractalConfig.components.set("default.preview", "@preview");

fractalConfig.web.set(
  "server.syncOptions",
  require("./fractalServer/browserSync")({ port: fractalSyncPort })
);

//Tell Fractal where to use handlebars for templating
const handlebars = require("./fractalServer/handlebars");

fractalConfig.components.engine(handlebars);

fractalConfig.docs.engine(handlebars);

if (process.argv.includes("export")) {
  fractalExport({ exportDirectory, fractal: fractalConfig, logger }).then(
    () => {
      fs.copySync(buildDir, exportDirectory);
      process.exit();
    }
  );
} else {
  const server = fractalConfig.web.server({
    port: fractalSyncPort,
    sync: true,
    watch: true,
  });

  server.start().then(() => {
    logger.log(`\
─────────────────────────────────────────
Fractal web UI server is running!
Use ^C to stop the server.
─────────────────────────────────────────
  `);
  });
}
