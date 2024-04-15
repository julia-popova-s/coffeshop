import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions) {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  return {
    devServer: isDev ? buildDevServer(options) : undefined,

    entry: {
      main: paths.entry,
    },

    mode: mode ?? 'development',

    module: {
      rules: buildLoaders(options),
    },

    output: {
      assetModuleFilename: 'assets',
      clean: true,
      filename: '[name].[contenthash:8].js',
      path: paths.output,
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(),
  };
}
