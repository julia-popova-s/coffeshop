export interface BuildPaths {
  entry: string;
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
