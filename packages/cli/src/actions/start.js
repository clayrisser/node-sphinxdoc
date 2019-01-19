import Err from 'err';

export default async function start(config) {
  const { open, output, platform, platformName, port, serve, readme } = config;
  if (!platformName) throw new Err('platform not specified', 400);
  if (!platform) throw new Err(`invalid platform '${platformName}'`, 400);
  const PlatformModule = platform.import();
  const platformModule = new PlatformModule({
    open,
    output,
    platform,
    port,
    readme,
    serve
  });
  await platformModule.install();
  await platformModule.start();
}
