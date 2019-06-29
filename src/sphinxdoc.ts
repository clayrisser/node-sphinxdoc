import fs from 'fs-extra';
import open from 'open';
import path from 'path';
import pkgDir from 'pkg-dir';
import { createMonitor, Monitor } from 'watch';
import { createServer } from 'http-server';
import { python, pip } from 'python-env';
import handleError from './handleError';
import { Config, Paths } from './types';

export default class Sphinxdoc {
  _paths: Paths;

  constructor(public config: Config) {}

  async loadEnvironment() {
    await fs.mkdirs(this.paths.working);
    await fs.copy(
      path.resolve(this.paths.self, 'archetype'),
      this.paths.working
    );
    let sphinxdocrcPath = path.resolve(this.paths.project, '.sphinxdocrc');
    const sphinxdocrcPyPath = path.resolve(
      this.paths.project,
      '.sphinxdocrc.py'
    );
    if (fs.existsSync(sphinxdocrcPyPath)) sphinxdocrcPath = sphinxdocrcPyPath;
    if (fs.existsSync(sphinxdocrcPath)) {
      await fs.copy(
        sphinxdocrcPath,
        path.resolve(this.paths.working, 'conf.py')
      );
    }
    const requirementsPath = path.resolve(
      this.paths.project,
      '.sphinxdoc.requirements'
    );
    if (fs.existsSync(requirementsPath)) {
      await fs.copy(
        requirementsPath,
        path.resolve(this.paths.working, 'requirements.txt')
      );
    }
    if (this.config.readme) {
      const readmePath = path.resolve(this.paths.project, 'README.md');
      if (fs.existsSync(readmePath)) {
        await fs.copy(readmePath, path.resolve(this.paths.working, 'index.md'));
      }
    }
    if (fs.existsSync(this.paths.docs)) {
      await fs.copy(this.paths.docs, this.paths.working);
    }
    await fs.writeJson(
      path.resolve(this.paths.working, 'config.json'),
      this.config
    );
  }

  get paths(): Paths {
    if (this._paths) return this._paths;
    const projectPath = pkgDir.sync(process.cwd()) || process.cwd();
    const outputPath = path.resolve(projectPath, this.config.outputPath);
    const workingPath = path.resolve(
      projectPath,
      '.tmp/sphinxdoc',
      this.config.output
    );
    this._paths = {
      dist: path.resolve(outputPath, this.config.output),
      docs: path.resolve(projectPath, this.config.docsPath),
      output: outputPath,
      project: projectPath,
      self: pkgDir.sync(__dirname) || path.resolve(__dirname, '..'),
      working: workingPath
    };
    return this._paths;
  }

  async pip(args: string[]) {
    return pip(args);
  }

  async python(args: string[]) {
    return python(args);
  }

  async install() {
    await this.loadEnvironment();
    await this.pip([
      'install',
      '-r',
      path.resolve(this.paths.working, 'requirements.txt')
    ]);
  }

  async clean(all = true) {
    await fs.remove(this.paths.working);
    if (all) await fs.remove(this.paths.output);
  }

  async build() {
    await this.clean(false);
    const buildPath = path.resolve(this.paths.working, 'build');
    await this.loadEnvironment();
    await this.python([
      '-m',
      'sphinx',
      '-M',
      this.config.output,
      this.paths.working,
      buildPath
    ]);
    await fs.mkdirs(this.paths.dist);
    fs.copySync(path.resolve(buildPath, this.config.output), this.paths.dist);
  }

  async start() {
    const { logger } = this.config;
    await this.clean(false);
    await this.build();
    const buildPath = path.resolve(this.paths.working, 'build');
    const monitor: Monitor = await new Promise(resolve => {
      return createMonitor(
        this.paths.project,
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
    if (this.config.serve) {
      const server = createServer({
        root: path.resolve(buildPath, this.config.output)
      });
      // @ts-ignore
      server.server.on('error', handleError);
      // @ts-ignore
      server.listen(this.config.port, (err: Error) => {
        if (err) throw err;
        logger.info(`listening on port ${this.config.port}`);
        if (this.config.open) open(`http://localhost:${this.config.port}`);
      });
    }
  }
}
