import _ from 'lodash';
import mergeConfiguration from 'merge-configuration';
import rcConfig from 'rc-config';
import defaultConfig from './defaultConfig';
import platforms from '../platforms';

export default async function createConfig(
  { action, options = {}, platform = {} },
  config = {},
  passes = 0
) {
  options = sanitizeOptions(options);
  const userConfig = rcConfig({ name: 'sphinxdoc' });
  const optionsConfig = options.config ? JSON.parse(options.config) : {};
  if (passes < 2) config = mergeConfiguration(config, defaultConfig);
  config = mergeConfiguration(config, platform?.config || {});
  config = mergeConfiguration(config, userConfig);
  config = mergeConfiguration(config, optionsConfig);
  if (options.platform && !_.isBoolean(options.platform)) {
    config.platformName = options.platform;
  }
  if (config.platformName) platform = platforms[config.platformName];
  config.open = options.open || config.open;
  config.output = options.output || config.output;
  config.port = Number(options.port || config.port);
  config.serve = options.serve || config.serve;
  config = {
    ...config,
    action,
    options,
    platform,
    platforms
  };
  if (passes < 2) {
    return createConfig({ action, options, platform }, config, ++passes);
  }
  return config;
}

function sanitizeOptions(options) {
  return _.reduce(
    options,
    (options, option, key) => {
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
