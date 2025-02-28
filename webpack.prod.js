const merge = require("webpack-merge").merge;
const path = require("path");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
  },
});
