import crossSpawn from 'cross-spawn';
import fs from 'fs-extra';
import path from 'path';
import pkgDir from 'pkg-dir';
import { Platform } from '@sphinxdoc/core';
import { createMonitor } from 'watch';

const rootPath = pkgDir.sync(process.cwd());

export default class Rtd extends Platform {
  constructor(...args) {
    super(...args);
    this.gatsbyCli = path.resolve(
      pkgDir.sync(
        require.resolve('gatsby-cli', {
          paths: path.resolve(rootPath, 'node_modules')
        })
      ),
      'lib/index.js'
    );
    this.gatsbyTheme = pkgDir.sync(
      require.resolve('@sphinxdoc/gatsby-theme', {
        paths: path.resolve(rootPath, 'node_modules')
      })
    );
  }

  async build(buildGatsby = true) {
    if (this.output !== 'gatsby' && this.output !== 'html') {
      return super.build();
    }
    const { paths } = this;
    const buildPath = path.resolve(paths.working, 'build');
    const distPath = path.resolve(paths.project, 'dist/docs/gatsby');
    await this.loadEnvironment();
    await this.python([
      '-m',
      'sphinx',
      '-M',
      'jekyll',
      paths.working,
      buildPath
    ]);
    fs.mkdirsSync(distPath);
    fs.copySync(paths.docs, path.resolve(this.gatsbyTheme, 'src/pages'), {
      filter: src => /\.js$/.test(src)
    });
    fs.copySync(
      path.resolve(buildPath, 'jekyll'),
      path.resolve(this.gatsbyTheme, 'src/pages')
    );
    if (buildGatsby) await this.buildGatsby();
    return null;
  }

  async buildGatsby() {
    const { paths } = this;
    const distPath = path.resolve(paths.project, 'dist/docs/gatsby');
    await this.gatsby(['build']);
    fs.mkdirsSync(distPath);
    return fs.copySync(path.resolve(this.gatsbyTheme, 'public'), distPath);
  }

  async start() {
    const { paths } = this;
    await this.build(false);
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
      await this.build(false);
    });
    if (this.serve) {
      return this.gatsby([
        'develop',
        '-p',
        this.port,
        ...(this.open ? ['-o'] : [])
      ]);
    }
    return this.buildGatsby();
  }

  async gatsby(args) {
    return new Promise((resolve, reject) => {
      const cp = crossSpawn('node', [this.gatsbyCli, '--verbose', ...args], {
        cwd: this.gatsbyTheme,
        stdio: 'inherit'
      });
      cp.on('close', resolve);
      cp.on('error', reject);
    });
  }
}
