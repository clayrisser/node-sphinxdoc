import Err from 'err';
import _ from 'lodash';
import commander from 'commander';
import ora from 'ora';
import action from './action';
import handleError from './errors';

const spinner = ora();
let isAction = false;

commander.command('build');
commander.option('-d --debug', 'debug logging');
commander.option('-v --verbose', 'verbose logging');
commander.action((cmd, options) => {
  try {
    isAction = true;
    return action(cmd, sanitizeOptions(options), spinner);
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
