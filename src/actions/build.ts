import { Config } from '../types';

export async function build({ logger }: Config) {
  logger.info('building');
}
