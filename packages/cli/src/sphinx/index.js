import fs from 'fs-extra';
import open from 'open';
import path from 'path';
import pkgDir from 'pkg-dir';
import { createMonitor } from 'watch';
import { createServer } from 'http-server';
import { python, pip } from 'python-env';
import handleError from '../errors';
import log from '../logger';

export default class Sphinx {
  constructor({
    docsPath = 'docs',
    open = true,
    output = 'html',
    platform,
    port = 3000
  }) {
    this._docsPath = docsPath;
    this.open = open;
    this.output = output;
    this.platform = platform;
    this.port = port;
    this.loadEnvironment();
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

  async install() {
    const { paths } = this;
    await this.loadEnvironment();
    await pip([
      'install',
      '-r',
      path.resolve(paths.working, 'requirements.txt')
    ]);
  }

  async build() {
    const { paths } = this;
    await python([
      '-m',
      'sphinx',
      '-M',
      this.output,
      paths.working,
      path.resolve(paths.working, 'build')
    ]);
  }

  async start() {
    const { paths } = this;
    await this.build();
    const server = createServer({
      root: path.resolve(paths.working, 'build', this.output)
    });
    const monitor = await new Promise(resolve => {
      return createMonitor(
        paths.working,
        {
          ignoreDotFiles: true,
          ignoreDirectoryPattern: /build/
        },
        resolve
      );
    });
    monitor.on('changed', async () => {
      await this.build();
    });
    server.server.on('error', handleError);
    server.listen(this.port, err => {
      if (err) throw err;
      log.info(`listening on port ${this.port}`);
      open(`http://localhost:${this.port}`);
    });
  }

  loadEnvironment() {
    const { paths } = this;
    fs.mkdirsSync(paths.working);
    fs.copySync(path.resolve(paths.platform, 'docs'), paths.working);
    if (fs.existsSync(paths.docs)) fs.copySync(paths.docs, paths.working);
  }
}
