const merge = require("webpack-merge").merge;
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    publicPath: "/image-",
    path: path.resolve(__dirname, "dist"),
  },
});
