import path from 'path';
import { Configuration } from 'webpack';

import { buildWebpack } from './config/builsWebpack';
import { BuildPaths, EnvVariables } from './config/types/types';

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'js', 'main.ts'),
    favicon: path.resolve(__dirname, 'src', 'assets', 'icons', 'favicon.ico'),
    html: path.resolve(__dirname, 'src', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
  };

  const config: Configuration = buildWebpack({
    mode: env?.mode ?? 'development',
    paths,
    port: env?.port ?? 3000,
  });

  return config;
};
