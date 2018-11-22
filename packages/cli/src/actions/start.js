import Err from 'err';
import Sphinx from '../sphinx';

export default async function build(config) {
  const { platform, platformName } = config;
  if (!platformName) throw new Err('platform not specified', 400);
  if (!platform) throw new Err(`invalid platform '${platformName}'`, 400);
  const sphinx = new Sphinx({ platform });
  await sphinx.install();
  await sphinx.start();
}
