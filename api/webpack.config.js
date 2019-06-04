const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    ...slsw.lib.entries,
    server: path.join(__dirname, "/src/graphql/server.ts"),
    random: path.join(__dirname, "/src/graphql/random/resolver.ts")
  },
  devtool: slsw.lib.webpack.isLocal ? "eval-source-map" : "",
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  target: "node",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx", ".graphql"]
  },
  module: {
    rules: [
      { test: /\.ts(x?)$/, loader: "ts-loader" },
      { test: /\.graphql|gql?$/, loader: "webpack-graphql-loader" }
    ]
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "/build"),
    filename: "[name].js",
    sourceMapFilename: "[file].map"
  }
};
