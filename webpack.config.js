/*
 * Changes to this file will not be automatically reloaded,
 * instead you will have to restart the process to do so.
 */

const nib = require('nib')
const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "#inline-source-map",
  entry: {
    "app": [
      "./src/client",
      "webpack-hot-middleware/client",
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'stylus-loader',
            options: {
              use: [nib()],
            },
          },
        ],
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
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },
};
