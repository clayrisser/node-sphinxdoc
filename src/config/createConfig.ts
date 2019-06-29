import mergeConfiguration from 'merge-configuration';
import { environment } from 'js-info';
import defaultConfig from './defaultConfig';
import { Config, Option, Options } from '../types';

export default function createConfig(
  action: string,
  options: Options = {},
  customConfig: Partial<Config> = {}
): Config {
  options = sanitizeOptions(options);
  let config = mergeConfiguration(defaultConfig, customConfig);
  config = {
    ...config,
    action,
    docsPath: options.docsPath || config.docsPath,
    env: environment.value,
    open: options.open || config.open,
    options,
    output: options.output || config.output,
    outputPath: options.outputPath || config.outputPath,
    port: Number(options.port || config.port),
    serve: options.serve || config.serve
  };
  return config;
}

function sanitizeOptions(options: Options): Options {
  return Object.entries(options).reduce(
    (options: { [key: string]: Option }, [key, option]: [string, Option]) => {
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
