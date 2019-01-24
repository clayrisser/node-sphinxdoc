import Err from 'err';
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
  constructor(
    {
      docsPath = 'docs',
      open = false,
      output,
      platform,
      port = 3000,
      readme = true,
      serve = false
    },
    config
  ) {
    if (!output) throw new Err('output not defined');
    this._docsPath = docsPath;
    this.config = config;
    this.open = open;
    this.output = output;
    this.platform = platform;
    this.port = port;
    this.readme = readme;
    this.serve = serve;
  }

  get paths() {
    if (this._paths) return this._paths;
    const projectPath = pkgDir.sync(process.cwd());
    const platformPath = pkgDir.sync(
      require.resolve(this.platform.name, {
        paths: [path.resolve(projectPath, 'node_modules')]
      })
    );
    const workingPath = path.resolve(
      projectPath,
      '.tmp/sphinx',
      this.platform.properties.name
    );
    this._paths = {
      docs: path.resolve(projectPath, this._docsPath),
      platform: platformPath,
      project: projectPath,
      working: workingPath
    };
    return this._paths;
  }

  async pip(...args) {
    return pip(...args);
  }

  async python(...args) {
    return python(...args);
  }

  async install() {
    const { paths } = this;
    await this.loadEnvironment();
    await this.pip([
      'install',
      '-r',
      path.resolve(paths.working, 'requirements.txt')
    ]);
  }

  async build() {
    const { paths } = this;
    const buildPath = path.resolve(paths.working, 'build');
    const distPath = path.resolve(paths.project, 'dist/docs', this.output);
    await this.loadEnvironment();
    await this.python([
      '-m',
      'sphinx',
      '-M',
      this.output,
      paths.working,
      buildPath
    ]);
    fs.mkdirsSync(distPath);
    fs.copySync(path.resolve(buildPath, this.output), distPath);
  }

  async start() {
    const { paths } = this;
    await this.build();
    const server = this.serve
      ? createServer({
          root: path.resolve(paths.working, 'build', this.output)
        })
      : null;
    const monitor = await new Promise(resolve => {
      return createMonitor(
        paths.project,
        {
          ignoreDirectoryPattern: /node_modules/,
          ignoreDotFiles: true
        },
        resolve
      );
    });
    monitor.on('changed', async () => {
      await this.build();
    });
    if (this.serve) {
      server.server.on('error', handleError);
      server.listen(this.port, err => {
        if (err) throw err;
        log.info(`listening on port ${this.port}`);
        if (this.open) open(`http://localhost:${this.port}`);
      });
    }
  }

  async loadEnvironment() {
    const { paths } = this;
    fs.mkdirsSync(paths.working);
    fs.copySync(path.resolve(paths.platform, 'archetype'), paths.working);
    if (this.readme) {
      const readmePath = path.resolve(paths.project, 'README.md');
      if (fs.existsSync(readmePath)) {
        fs.copySync(readmePath, path.resolve(paths.working, 'index.md'));
      }
    }
    if (fs.existsSync(paths.docs)) fs.copySync(paths.docs, paths.working);
  }
}
