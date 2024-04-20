import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { ModuleOptions } from 'webpack';

import { BuildOptions, Paths } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: ['autoprefixer', 'postcss-sort-media-queries', 'cssnano'],
      },
      sourceMap: true,
    },
  };

  const imageFileLoader = {
    generator: {
      filename: Paths.Images,
    },
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset/resource',
  };

  const fontFileLoader = {
    generator: {
      filename: Paths.Fonts,
    },
    test: /\.(woff|woff2?|eot|ttf|otf)$/i,
    type: 'asset/resource',
  };

  const svgFileLoader = {
    generator: {
      filename: Paths.Icons,
    },
    test: /\.svg$/,
    type: 'asset/resource',
  };

  const tsLoader = {
    exclude: /node_modules/,
    test: /\.ts$/,
    use: 'ts-loader',
  };

  const styleLoader = {
    test: /\.s[ac]ss$/i,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', postCssLoader, 'sass-loader'],
  };

  return [styleLoader, imageFileLoader, fontFileLoader, svgFileLoader, tsLoader];
}
