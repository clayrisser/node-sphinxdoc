import Err from 'err';

export default async function start(config) {
  const { platform, port, open, output, platformName } = config;
  if (!platformName) throw new Err('platform not specified', 400);
  if (!platform) throw new Err(`invalid platform '${platformName}'`, 400);
  const PlatformModule = platform.module;
  const platformModule = new PlatformModule({ platform, output, port, open });
  await platformModule.install();
  await platformModule.start();
}
