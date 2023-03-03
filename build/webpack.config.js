const path = require("path");
const generateEntry = require("./generateEntry");
const generateTemplate = require("./generateTemplate");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entry = generateEntry();
const templates = generateTemplate(entry);

module.exports = {
  mode: "development",
  entry,
  output: {
    filename: "[name].[contenthash].js",
  },
  devtool: "source-map",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".js"],
  },
  //文件类型解析相关
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: 8089,
    open: true,
  },
  plugins: [new MiniCssExtractPlugin(), ...templates],
};
