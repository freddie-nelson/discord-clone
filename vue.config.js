const path = require("path");

module.exports = {
  outputDir: "client/dist",
  pages: {
    index: {
      entry: "client/src/main.js",
      template: "client/public/index.html",
    },
  },
  devServer: {
    proxy: "http://localhost:3000",
    contentBase: path.join(__dirname, "client/public"),
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
      },
    },
  },
};
