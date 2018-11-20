import { python, pip } from 'python-env';

export default class Sphinx {
  async init() {
    await pip('--version');
    await python(['-c', 'print("initializing")']);
  }
}
