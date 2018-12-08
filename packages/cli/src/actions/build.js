import Err from 'err';

export default async function build(config) {
  const { output, platform, platformName, serve } = config;
  if (!platformName) throw new Err('platform not specified', 400);
  if (!platform) throw new Err(`invalid platform '${platformName}'`, 400);
  const PlatformModule = platform.import();
  const platformModule = new PlatformModule({
    output,
    platform,
    serve
  });
  await platformModule.install();
  await platformModule.build();
}
