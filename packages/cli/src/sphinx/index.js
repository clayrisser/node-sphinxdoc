import fs from 'fs-extra';
import path from 'path';
import pkgDir from 'pkg-dir';
import { python, pip } from 'python-env';

export default class Sphinx {
  constructor({ platform, docsPath = 'docs' }) {
    this.platform = platform;
    this._docsPath = docsPath;
  }

  get paths() {
    if (this._paths) return this._paths;
    const projectPath = pkgDir.sync(process.cwd());
    const platformPath = pkgDir.sync(
      require.resolve(this.platform, {
        paths: [path.resolve(projectPath, 'node_modules')]
      })
    );
    const workingPath = path.resolve(projectPath, '.tmp/sphinx');
    this._paths = {
      docs: path.resolve(projectPath, this._docsPath),
      platform: platformPath,
      project: projectPath,
      working: workingPath
    };
    return this._paths;
  }

  async init() {
    const { paths } = this;
    await this.loadEnvironment();
    await pip([
      'install',
      '-r',
      path.resolve(paths.working, 'requirements.txt')
    ]);
    await python('--version');
  }

  async loadEnvironment() {
    const { paths } = this;
    fs.mkdirsSync(paths.working);
    fs.copySync(path.resolve(paths.platform, 'docs'), paths.working);
    if (fs.existsSync(paths.docs)) fs.copySync(paths.docs, paths.working);
  }
}
