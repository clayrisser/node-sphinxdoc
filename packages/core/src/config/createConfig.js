import ConfigLoader from '@ecosystem/config';
import ModuleLoader from '@ecosystem/module-loader';
import _ from 'lodash';
import pkgDir from 'pkg-dir';
import State from './state';
import defaultConfig from './defaultConfig';

const rootPath = pkgDir.sync(process.cwd());
const state = new State();
let configLoader = null;

export default function createConfig({ action, options = {}, socket = true }) {
  options = sanitizeOptions(options);
  const platforms = new ModuleLoader('sphinxdocPlatform', {
    configPath: 'config',
    dependsOnPath: 'dependsOn'
  });
  configLoader = new ConfigLoader('sphinxdoc', {
    cache: true,
    defaultConfig,
    loaders: [platforms],
    optionsConfig: options.config || '{}',
    socket: socket ? { silent: !options.debug && !options.verbose } : false
  });
  const { config } = configLoader;
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
  state.config = {
    ...config,
    action,
    options,
    platforms,
    rootPath
  };
  return state.config;
}

export function getConfig() {
  if (!configLoader) {
    configLoader = new ConfigLoader('sphinxdoc', {
      defaultConfig,
      socket: true
    });
    configLoader.mc.onUpdate = handleUpdate;
  }
  handleUpdate(configLoader.config);
  return state.config;
}

function handleUpdate(config) {
  if (configLoader.mc.owner) {
    state.config = config;
  } else {
    state.config = createConfig({
      action: config.action,
      options: config.options
    });
  }
  return state.config;
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
