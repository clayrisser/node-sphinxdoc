import { Config } from '../types';

export async function clean({ logger }: Config) {
  logger.info('cleaning');
}
