import Sphinxdoc from '../sphinxdoc';
import { Dependancies, Config } from '../types';

export async function start(config: Config, { spinner }: Dependancies) {
  const sphinxdoc = new Sphinxdoc(config);
  spinner.info(`starting ${config.output}`);
  await sphinxdoc.install();
  await sphinxdoc.start((message: string) => spinner.succeed(message));
}
