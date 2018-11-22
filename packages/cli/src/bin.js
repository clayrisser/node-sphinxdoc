import Err from 'err';
import _ from 'lodash';
import commander from 'commander';
import action from './action';
import config from './config';
import handleError from './errors';

let isAction = false;

commander.command('build');
commander.command('start');
commander.option('--platform [name]', 'platform name');
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
