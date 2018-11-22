import Err from 'err';
import _ from 'lodash';
import commander from 'commander';
import { handleError } from '@sphinxdoc/core';
import action from './action';
import { createConfigSync } from './config';

let isAction = false;

commander.command('build');
commander.command('start');
commander.option('--config [json]', 'config json');
commander.option('--open', 'open browser');
commander.option('--output [name]', 'output name');
commander.option('--platform [name]', 'platform name');
commander.option('--port [number]', 'port number');
commander.option('-d --debug', 'debug logging');
commander.option('-v --verbose', 'verbose logging');
commander.action((cmd, options) => {
  try {
    isAction = true;
    const config = createConfigSync({ options });
    config.action = cmd;
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
