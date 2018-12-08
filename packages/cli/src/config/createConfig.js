import ConfigLoader from '@ecosystem/config';
import ModuleLoader from '@ecosystem/module-loader';
import _ from 'lodash';
import defaultConfig from './defaultConfig';

export default function createConfig({ action, options = {} }) {
  options = sanitizeOptions(options);
  const platforms = new ModuleLoader('sphinxdocPlatform', {
    configPath: 'config',
    dependsOnPath: 'dependsOn'
  });
  const sphinxdoc = new ConfigLoader('sphinxdoc', {
    defaultConfig,
    loaders: [platforms],
    optionsConfig: options.config || '{}',
    socket: false
  });
  const { config } = sphinxdoc;
  if (options.platform && !_.isBoolean(options.platform)) {
    config.platformName = options.platform;
  }
  if (config.platformName) {
    config.platform = _.find(platforms.modules, platform => {
      return !!platform.properties.name;
    });
  }
  config.open = options.open || config.open;
  config.output = options.output || config.output;
  config.port = Number(options.port || config.port);
  config.serve = options.serve || config.serve;
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
