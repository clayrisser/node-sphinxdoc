import ConfigLoader, { socketGetConfig } from '@ecosystem/config';
import ModuleLoader from '@ecosystem/module-loader';
import _ from 'lodash';
import pkgDir from 'pkg-dir';
import defaultConfig from './defaultConfig';

const rootPath = pkgDir.sync(process.cwd());

export default function createConfig({ action, options = {}, socket = false }) {
  options = sanitizeOptions(options);
  const platforms = new ModuleLoader('sphinxdocPlatform', {
    configPath: 'config',
    dependsOnPath: 'dependsOn'
  });
  const sphinxdoc = new ConfigLoader('sphinxdoc', {
    defaultConfig,
    loaders: [platforms],
    optionsConfig: options.config || '{}',
    socket: socket ? { silent: false } : false
  });
  const { config } = sphinxdoc;
  if (options.platform && !_.isBoolean(options.platform)) {
    config.platformName = options.platform;
  }
  if (config.platformName) {
    config.platform = _.find(platforms.modules, platform => {
      return platform.properties.name === config.platformName;
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
    platforms,
    rootPath
  };
}

export function rebuildConfig() {
  const config = socketGetConfig('sphinxdoc');
  return createConfig({ action: config.action, options: config.options });
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
