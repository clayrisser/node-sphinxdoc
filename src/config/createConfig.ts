import mergeConfiguration from 'merge-configuration';
import { environment } from 'js-info';
import defaultConfig from './defaultConfig';
import { Config, Option, Options, Logger } from '../types';

const logger: Logger = console;

export default function createConfig(
  action: string,
  options: Options = {},
  customConfig: Partial<Config> = {}
): Config {
  options = sanitizeOptions(options);
  let config = mergeConfiguration(defaultConfig, customConfig);
  if (options.output) config.output = options.output as string;
  config = {
    ...config,
    action,
    env: environment.value,
    logger,
    options
  };
  return config;
}

function sanitizeOptions(options: Options): Options {
  return Object.entries(options).reduce(
    (options: Options, [key, option]: [string, Option]) => {
      if (
        key.length &&
        key[0] !== '_' &&
        key !== 'Command' &&
        key !== 'Option' &&
        key !== 'args' &&
        key !== 'commands' &&
        key !== 'options' &&
        key !== 'rawArgs'
      ) {
        options[key] = option;
      }
      return options;
    },
    {}
  );
}
