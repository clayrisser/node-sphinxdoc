import Err from 'err';
import commander from 'commander';
import { createConfig } from '@sphinxdoc/core/lib/config';
import { handleError } from '@sphinxdoc/core';
import action from './action';

let isAction = false;

commander.command('build');
commander.command('start');
commander.option('--config [json]', 'config json');
commander.option('--open', 'open browser');
commander.option('--output [name]', 'output name');
commander.option('--platform [name]', 'platform name');
commander.option('--port [number]', 'port number');
commander.option('--serve', 'serve docs');
commander.option('-d --debug', 'debug logging');
commander.option('-v --verbose', 'verbose logging');
commander.action((cmd, options) => {
  try {
    isAction = true;
    const config = createConfig({ options, action: cmd, socket: true });
    return action(config).catch(err => handleError(err, { kill: true }));
  } catch (err) {
    return handleError(err, { kill: true });
  }
});
commander.parse(process.argv);

if (!isAction) {
  handleError(new Err('action not specified', 400), { kill: true });
}
