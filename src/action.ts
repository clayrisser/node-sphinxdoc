import Err from 'err';
import handleError from './handleError';
import { Config, Dependancies } from './types';
import { build, clean, start } from './actions';

export default async function action(
  config: Config,
  dependancies: Dependancies
) {
  const { action } = config;
  switch (action) {
    case 'build':
      return build(config, dependancies);
    case 'clean':
      return clean(config, dependancies);
    case 'start':
      return start(config, dependancies);
  }
  return handleError(new Err(`action '${action}' not found`), dependancies);
}
