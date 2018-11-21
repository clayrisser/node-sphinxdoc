import path from 'path';
import pkgDir from 'pkg-dir';
import { python, pip } from 'python-env';

export default class Sphinx {
  constructor({ platform }) {
    this.platform = platform;
    this.requirements = path.resolve(
      pkgDir.sync(require.resolve(this.platform)),
      'requirements.txt'
    );
  }

  async init() {
    await pip(['install', '-r', this.requirements]);
    await python('--version');
  }
}
