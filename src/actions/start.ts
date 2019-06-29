import Sphinxdoc from '../sphinxdoc';
import { Dependancies, Config } from '../types';

export async function start(config: Config, { spinner }: Dependancies) {
  const sphinxdoc = new Sphinxdoc(config);
  spinner.start(`starting ${config.output}`);
  await sphinxdoc.install();
  spinner.stop();
  await sphinxdoc.start((message: string) => spinner.succeed(message));
}
