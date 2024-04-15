import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { BuildOptions } from './types/types';

export function buildDevServer({ paths, port }: BuildOptions): DevServerConfiguration {
  return {
    open: true,
    port,
  };
}
