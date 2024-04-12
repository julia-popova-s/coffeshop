const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: ['autoprefixer', 'postcss-sort-media-queries', 'cssnano'],
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
  assetModuleFilename: 'assets',
};

const entry = {
  main: './src/js/main.js',
};

const imageFileLoader = {
  test: /\.(png|jpe?g|gif)$/i,
  type: 'asset/resource',
  generator: {
    filename: path.join('assets/images', '[name]-[contenthash:8][ext]'),
  },
};

const fontFileLoader = {
  test: /\.(woff|woff2?|eot|ttf|otf)$/i,
  type: 'asset/resource',
  generator: {
    filename: path.join('assets/fonts', '[name]-[contenthash:8][ext]'),
  },
};

const svgFileLoader = {
  test: /\.svg$/,
  type: 'asset/resource',
  generator: {
    filename: path.join('assets/icons', '[name]-[contenthash:8][ext]'),
  },
};

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader',
};

const styleLoader = {
  test: /\.s[ac]ss$/i,
  use: [MiniCssExtractPlugin.loader, cssLoader, postcssLoader, sassLoader],
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
    watchFiles: path.join(__dirname, 'src'),
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
        {
          from: path.resolve(__dirname, 'src/assets/icons'),
          to: path.resolve(__dirname, 'build/assets/icons'),
        },
      ],
    }),
  ],

  module: {
    rules: [styleLoader, imageFileLoader, fontFileLoader, svgFileLoader, babelLoader],
  },
};
