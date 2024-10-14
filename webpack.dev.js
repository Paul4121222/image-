const merge = require("webpack-merge").merge;
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    static: ["./dist"],
    historyApiFallback: true,
  },
});
