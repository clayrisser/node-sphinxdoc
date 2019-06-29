export interface Platform {
  config: (config?: Config) => Partial<Config>;
}

export interface Envs {
  [key: string]: string | number | boolean | undefined;
}

export interface Config {
  action: string;
  docsPath: string;
  env: string;
  logger: Logger;
  open: boolean;
  options: Options;
  output: string;
  outputPath: string;
  port: number;
  readme: boolean;
  serve: boolean;
}

export interface Logger {
  error(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
}

export interface Options {
  [key: string]: Option;
}

export type Option = string | boolean | number;

export interface Paths {
  [key: string]: string;
}
