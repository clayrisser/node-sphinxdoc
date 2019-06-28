import cosmiconfig from 'cosmiconfig';
import mergeConfiguration from 'merge-configuration';
import pkgDir from 'pkg-dir';
import { environment } from 'js-info';
import { oc } from 'ts-optchain.macro';
import defaultConfig from './defaultConfig';
import { Config, Option, Options, Logger } from '../types';

const logger: Logger = console;

export default function createConfig(
  action: string,
  options: Options = {},
  customConfig: Partial<Config> = {}
): Config {
  const rootPath = pkgDir.sync(process.cwd()) || process.cwd();
  options = sanitizeOptions(options);
  const userConfig: Partial<Config> = oc(
    cosmiconfig('sphinxdoc').searchSync(rootPath)
  ).config({});
  let config = mergeConfiguration<Config>(defaultConfig, userConfig);
  config = mergeConfiguration(config, customConfig);
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
