import fs from 'fs-extra';
import path from 'path';
import pkgDir from 'pkg-dir';
import { python, pip } from 'python-env';

export default class Sphinx {
  constructor({ platform }) {
    this.platform = platform;
    this.paths = {
      platform: pkgDir.sync(require.resolve(this.platform))
    };
    this.paths.docs = path.resolve(this.paths.platform, 'docs');
    this.paths.environment = path.resolve(this.paths.platform, 'environment');
    this.paths.requiremnts = path.resolve(
      this.paths.environment,
      'requiremnts.txt'
    );
  }

  async init() {
    await this.loadEnvironment();
    await pip(['install', '-r', this.paths.requirements]);
    await python('--version');
  }

  async loadEnvironment() {
    fs.copySync(this.paths.docs, this.paths.environment);
  }
}
