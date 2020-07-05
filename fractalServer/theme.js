module.exports = (fractal) => {
  const fractalTheme = require("@frctl/mandelbrot")({
    skin: "black",
    styles: ["default"],
    scripts: ["default"],
  });
  // fractalTheme.addLoadPath(path.join(__dirname, './'));
  fractal.web.theme(fractalTheme);
};
