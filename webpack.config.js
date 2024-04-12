const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: ['autoprefixer', 'cssnano'],
    },
  },
};

const cssLoader = {
  loader: 'css-loader',
  options: { sourceMap: true },
};

const sassLoader = {
  loader: 'sass-loader',
  options: { sourceMap: true },
};

const output = {
  filename: '[name].[contenthash:8].js',
  path: path.resolve(__dirname, 'build'),
  clean: true,
  assetModuleFilename: 'assets/images/[name]-[contenthash:8][ext]',
};

const entry = {
  main: './src/js/main.js',
};

module.exports = {
  mode: 'development',
  entry,

  output,

  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'style.[contenthash:8].css',
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'build/assets/images'),
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, cssLoader, postcssLoader, sassLoader],
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
