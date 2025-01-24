const merge = require("webpack-merge").merge;
const common = require("./webpack.common");
const webpack = require("webpack");
const proxyConfig = [
  {
    context: ["/api"],
    target: "http://127.0.0.1:3000",
    changeOrigin: true,
  },
];
module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    static: ["./dist"],
    historyApiFallback: true,
    proxy: proxyConfig,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
  ],
});
