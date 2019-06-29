import Sphinxdoc from '../sphinxdoc';
import { Config, Dependancies } from '../types';

export async function build(config: Config, { spinner }: Dependancies) {
  const sphinxdoc = new Sphinxdoc(config);
  spinner.start(`building ${config.output}`);
  spinner.stop();
  await sphinxdoc.install();
  await sphinxdoc.build();
  spinner.succeed(`built ${config.output}`);
}
