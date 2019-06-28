import { Config } from '../types';

export async function start({ logger }: Config) {
  logger.info('starting');
}
