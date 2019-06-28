import Err from 'err';
import handleError from './handleError';
import { Config } from './types';
import { build, clean, start } from './actions';

export default async function action(config: Config) {
  const { action } = config;
  switch (action) {
    case 'build':
      return build(config);
    case 'clean':
      return clean(config);
    case 'start':
      return start(config);
  }
  return handleError(new Err(`action '${action}' not found`));
}
