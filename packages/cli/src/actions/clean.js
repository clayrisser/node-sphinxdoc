import Err from 'err';

export default async function clean(config) {
  const { output, platform, platformName } = config;
  if (!platformName) throw new Err('platform not specified', 400);
  if (!platform) throw new Err(`invalid platform '${platformName}'`, 400);
  const PlatformModule = platform.import();
  const platformModule = new PlatformModule(
    {
      output,
      platform
    },
    config
  );
  await platformModule.clean();
}
