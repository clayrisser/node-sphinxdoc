import Err from 'err';
import commander from 'commander';
import action from './action';
import handleError from './handleError';
import { Options } from './types';
import { createConfig } from './config';

let isAction = false;

commander.command('build');
commander.command('clean');
commander.command('start');
commander.option('--config [json]', 'config json');
commander.option('--output [name]', 'output name');
commander.option('-d --debug', 'debug logging');
commander.option('-v --verbose', 'verbose logging');
commander.action(async (cmd: string, options: Options) => {
  try {
    isAction = true;
    const config = createConfig(cmd, options);
    return action(config);
  } catch (err) {
    return handleError(err);
  }
});
commander.parse(process.argv);

if (!isAction) {
  handleError(new Err('action not specified', 400));
}
