export interface BuildPaths {
  entry: string;
  favicon?: string;
  html: string;
  images?: string;
  output: string;
  src: string;
}

export type BuildMode = 'development' | 'production';

export interface EnvVariables {
  mode: BuildMode;
  port: number;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  port: number;
}

export enum Paths {
  Fonts = 'assets/fonts/[name]-[contenthash:8][ext]',
  Icons = 'assets/icons/[name]-[contenthash:8][ext]',
  Images = 'assets/images/[name]-[contenthash:8][ext]',
}
