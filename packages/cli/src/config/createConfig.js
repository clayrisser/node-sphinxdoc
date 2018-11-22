import _ from 'lodash';
import mergeConfiguration from 'merge-configuration';
import rcConfig from 'rc-config';
import defaultConfig from './defaultConfig';

export default async function createConfig({ options = {} }) {
  options = sanitizeOptions(options);
  const userConfig = rcConfig({ name: 'sphinxdoc' });
  const optionsConfig = options.config ? JSON.parse(options.config) : {};
  let config = mergeConfiguration(defaultConfig, userConfig);
  config = mergeConfiguration(config, optionsConfig);
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
