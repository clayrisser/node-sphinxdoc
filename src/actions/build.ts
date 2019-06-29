import Sphinxdoc from '../sphinxdoc';
import { Config } from '../types';

export async function build(config: Config) {
  const sphinxdoc = new Sphinxdoc(config);
  await sphinxdoc.install();
  await sphinxdoc.build();
}
