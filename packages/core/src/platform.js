import fs from 'fs-extra';
import open from 'open';
import path from 'path';
import pkgDir from 'pkg-dir';
import { createMonitor } from 'watch';
import { createServer } from 'http-server';
import { python, pip } from 'python-env';
import handleError from './handleError';
import log from './log';

export default class Platform {
  constructor({
    docsPath = 'docs',
    open = false,
    output = 'html',
    platform,
    port = 3000
  }) {
    this._docsPath = docsPath;
    this.open = open;
    this.output = output;
    this.platform = platform;
    this.port = port;
  }

  get paths() {
    if (this._paths) return this._paths;
    const projectPath = pkgDir.sync(process.cwd());
    const platformPath = pkgDir.sync(
      require.resolve(this.platform.moduleName, {
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
    this.loadEnvironment();
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
      return createMonitor(paths.project, { ignoreDotFiles: true }, resolve);
    });
    monitor.on('changed', async () => {
      await this.build();
    });
    server.server.on('error', handleError);
    server.listen(this.port, err => {
      if (err) throw err;
      log.info(`listening on port ${this.port}`);
      if (this.open) open(`http://localhost:${this.port}`);
    });
  }

  loadEnvironment() {
    const { paths } = this;
    fs.mkdirsSync(paths.working);
    fs.copySync(path.resolve(paths.platform, 'docs'), paths.working);
    const readmePath = path.resolve(paths.project, 'README.md');
    if (fs.existsSync(readmePath)) {
      fs.copySync(readmePath, path.resolve(paths.working, 'index.md'));
    }
    if (fs.existsSync(paths.docs)) fs.copySync(paths.docs, paths.working);
  }
}
