import Err from 'err';
import _ from 'lodash';
import commander from 'commander';
import { handleError } from '@sphinxdoc/core';
import action from './action';
import config from './config';

let isAction = false;

commander.command('build');
commander.command('start');
commander.option('--open', 'open browser');
commander.option('--output [name]', 'output name');
commander.option('--platform [name]', 'platform name');
commander.option('--port [number]', 'port number');
commander.option('-d --debug', 'debug logging');
commander.option('-v --verbose', 'verbose logging');
commander.action((cmd, options) => {
  try {
    isAction = true;
    config.action = cmd;
    config.options = sanitizeOptions(options);
    if (options.platform && !_.isBoolean(options.platform)) {
      const platformName = options.platform;
      config.platformName = platformName;
      config.platform = config.platforms[platformName];
    }
    if (options.output) config.output = options.output;
    return action(config).catch(handleError);
  } catch (err) {
    return handleError(err);
  }
});
commander.parse(process.argv);

if (!isAction) {
  handleError(new Err('action not specified', 400));
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
