import Sphinxdoc from '../sphinxdoc';
import { Config } from '../types';

export async function clean(config: Config) {
  const sphinxdoc = new Sphinxdoc(config);
  await sphinxdoc.clean();
}
