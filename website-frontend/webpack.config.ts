import path from "path";
import { NormalModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
    modules: ["./src", "node_modules"],
    alias: {
      lib: "./src/lib",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(css|s[ac]ss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]",
              },
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: "scoped-css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    https: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new NormalModuleReplacementPlugin(
      /node_modules\/antd\/es\/style\/index\.less/,
      `./src/asset/substitute.less`
    ),
  ],
};

module.exports = config;
