import { Ora } from 'ora';

export interface Platform {
  config: (config?: Config) => Partial<Config>;
}

export interface Envs {
  [key: string]: string | number | boolean | undefined;
}

export interface Dependancies {
  spinner: Spinner;
}

export interface Config {
  action: string;
  docsPath: string;
  env: string;
  open: boolean;
  options: Options;
  output: string;
  outputPath: string;
  port: number;
  readme: boolean;
  serve: boolean;
}

export interface Options {
  docsPath?: string;
  open?: boolean;
  output?: string;
  outputPath?: string;
  port?: string;
  serve?: boolean;
}

export type Option = string | number;

export interface Paths {
  [key: string]: string;
}

export interface Spinner extends Ora {}
