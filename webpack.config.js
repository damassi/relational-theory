/*
 * Changes to this file will not be automatically reloaded,
 * instead you will have to restart the process to do so.
 */

const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    "app": [
      "./app/client",
      "webpack-hot-middleware/client",
    ]
  },
  module: {
    rules: [
      { test: /\.json$/, loader: "json-loader" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "assets"),
    publicPath: "/assets",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin("commons.chunk"),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devtool: "#inline-source-map", // TODO: For production we should output a source-map file instead.
};
