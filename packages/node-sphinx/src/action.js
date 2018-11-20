import Err from 'err';
import config from './config';
import handleError from './errors';
import { build } from './actions';
import { setLevel } from './logger';

export default async function action(cmd, options, spinner) {
  config.action = cmd;
  config.options = options;
  if (options.verbose) setLevel('verbose');
  if (options.debug) setLevel('debug');
  switch (cmd) {
    case 'build':
      return build(config, spinner);
  }
  spinner.stop();
  return handleError(new Err(`action '${cmd}' not found`));
}
