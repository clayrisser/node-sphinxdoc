import deasync from 'deasync';
import createConfig from './createConfig';

const createConfigSync = deasync(async (...args) => {
  const done = args.pop();
  const config = await createConfig(...args).catch(done);
  return done(null, config);
});

export { createConfig, createConfigSync };
export default { createConfig, createConfigSync };
