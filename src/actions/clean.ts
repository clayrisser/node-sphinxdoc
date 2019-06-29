import Sphinxdoc from '../sphinxdoc';
import { Dependancies, Config } from '../types';

export async function clean(config: Config, { spinner }: Dependancies) {
  const sphinxdoc = new Sphinxdoc(config);
  spinner.start('cleaning');
  await sphinxdoc.clean();
  spinner.succeed('cleaned');
}
