import Sphinxdoc from '../sphinxdoc';
import { Config } from '../types';

export async function start(config: Config) {
  const sphinxdoc = new Sphinxdoc(config);
  await sphinxdoc.install();
  await sphinxdoc.start();
}
