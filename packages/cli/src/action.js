import Err from 'err';
import handleError from './errors';
import { build } from './actions';
import { setLevel } from './logger';

export default async function action(config) {
  const { action, options } = config;
  if (options.verbose) setLevel('verbose');
  if (options.debug) setLevel('debug');
  switch (action) {
    case 'build':
      return build(config);
  }
  return handleError(new Err(`action '${action}' not found`));
}
