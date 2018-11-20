import deasync from 'deasync';
import createConfig from './createConfig';

const createConfigSync = deasync(async cb => {
  const config = await createConfig().catch(cb);
  return cb(null, config);
});

export default createConfigSync();
