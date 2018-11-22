import Err from 'err';
import { handleError } from '@sphinxdoc/core';
import { setLevel } from '@sphinxdoc/core/log';
import { build, start } from './actions';

export default async function action(config) {
  const { action, options } = config;
  if (options.verbose) setLevel('verbose');
  if (options.debug) setLevel('debug');
  switch (action) {
    case 'build':
      return build(config);
    case 'start':
      return start(config);
  }
  return handleError(new Err(`action '${action}' not found`));
}
