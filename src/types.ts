export interface Platform {
  config: (config?: Config) => Partial<Config>;
}

export interface Envs {
  [key: string]: string | number | boolean | undefined;
}

export interface Config {
  action: string;
  env: string;
  options: Options;
}

export interface Options {
  [key: string]: Option;
}

export type Option = string | boolean | number;
