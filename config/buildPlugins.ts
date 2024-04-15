import { default as CopyPlugin } from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration } from 'webpack';

import { BuildOptions } from './types/types';

export function buildPlugins({ paths }: BuildOptions): Configuration['plugins'] {
  return [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.html,
    }),

    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash:8].css',
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src', 'assets', 'images'),
          to: path.resolve(__dirname, '../build', 'assets', 'images'),
        },
        {
          from: path.resolve(__dirname, '../src', 'assets', 'icons'),
          to: path.resolve(__dirname, '../build', 'assets', 'icons'),
        },
      ],
    }),
  ];
}
