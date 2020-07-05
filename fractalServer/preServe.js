const fs = require("fs-extra");
const killPort = require("kill-port");

module.exports = ({ port, buildDir }) => {
  killPort(port);
  killPort(port, "udp");

  if (fs.existsSync(buildDir)) {
    fs.removeSync(buildDir);
  }
};
