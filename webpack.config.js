const globImporter = require("node-sass-glob-importer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = (env, argv) => {
  return {
    mode: "production",
    entry: {
      main: ["./js/main.js", "./sass/style.scss"]
    },
    devtool: argv.mode === "development" ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: argv.mode === "development",
                modules: false,
                localIdentName: "[local]___[hash:base64:5]",
                url: false
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: argv.mode === "development"
              }
            },
            {
              loader: "sass-loader",
              options: {
                importer: globImporter(),
                sourceMap: argv.mode === "development"
              }
            }
          ]
        },
        {
          include: path.resolve(__dirname, "js/utils.js"),
          sideEffects: false
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { modules: false }]]
            }
          }
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].min.js",
      publicPath: "/assets/"
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new LiveReloadPlugin({
        protocol: 'http',
        appendScriptTag: argv.mode === "development"
      })
    ],
    optimization: {
      usedExports: true
    }
  };
};
