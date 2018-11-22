import Err from 'err';

export default async function build(config) {
  const { platform, output, platformName } = config;
  if (!platformName) throw new Err('platform not specified', 400);
  if (!platform) throw new Err(`invalid platform '${platformName}'`, 400);
  const PlatformModule = platform.module;
  const platformModule = new PlatformModule({ platform, output });
  await platformModule.install();
  await platformModule.build();
}
