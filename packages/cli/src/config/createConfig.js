import _ from 'lodash';
import mergeConfiguration from 'merge-configuration';
import rcConfig from 'rc-config';
import defaultConfig from './defaultConfig';
import platforms from '../platforms';

export default async function createConfig({ options = {}, action }) {
  options = sanitizeOptions(options);
  const userConfig = rcConfig({ name: 'sphinxdoc' });
  const optionsConfig = options.config ? JSON.parse(options.config) : {};
  let config = mergeConfiguration(defaultConfig, userConfig);
  config = mergeConfiguration(config, optionsConfig);
  if (options.platform && !_.isBoolean(options.platform)) {
    const platformName = options.platform;
    config.platformName = platformName;
    config.platform = platforms[platformName];
  }
  config.port = Number(options.port || config.port);
  config.output = options.output || config.output;
  config.open = options.open || config.open;
  return {
    ...config,
    action,
    options,
    platforms
  };
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
