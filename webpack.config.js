const path = require("path");
const entryPath = path.resolve(__dirname, "./src/index.js");
const outputPath = path.resolve(__dirname, "public");

const webpack = require("webpack");
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      "process.env.DATABASE_URL": JSON.stringify(process.env.DATABASE_URL),
      "process.env.PORT": JSON.stringify(process.env.PORT),
      "process.env.SERVER_API_URL": JSON.stringify(process.env.SERVER_API_URL)
    }),
  ],
  entry: entryPath,
  output: {
    filename: "main.js",
    path: outputPath,
  },

  devServer: {
    contentBase: outputPath,
    watchContentBase: true,
    port: process.env.PORT,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },

  resolve: {
    fallback: {
      fs: false,
    },
  },
};
