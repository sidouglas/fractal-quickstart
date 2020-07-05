const createProxyMiddleware = require("http-proxy-middleware").createProxyMiddleware;
const proxiedUrl = "https://jsonplaceholder.typicode.com";

module.exports = ({ fractalServerUrl }) => {
  return [
    // this must come first
    createProxyMiddleware("/example", {
      target: proxiedUrl,
      changeOrigin: true,
      pathRewrite: (path, req) => {
        return `https://jsonplaceholder.typicode.com/todos/${path.slice(-1)}`;
      },
    }),
    // your local url that maps to a target url ( can be anything )
    createProxyMiddleware({
      target: fractalServerUrl,
      changeOrigin: true,
      router: {
        "/local-url": proxiedUrl,
      },
    }),
  ];
};
