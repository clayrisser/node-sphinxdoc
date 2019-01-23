import _ from 'lodash';
import crossSpawn from 'cross-spawn';
import fs from 'fs-extra';
import glob from 'glob';
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
    fs.copySync(
      path.resolve(buildPath, 'jekyll'),
      path.resolve(this.gatsbyTheme, 'src/pages')
    );
    await new Promise((resolve, reject) => {
      glob(`${paths.docs}/**/*.js`, (err, files) => {
        if (err) return reject(err);
        _.each(files, file => {
          const fileName = file.match(/[^/]*$/)?.[0] || '';
          const subPath = file.substr(
            paths.docs.length + 1,
            file.length - paths.docs.length - fileName.length - 2
          );
          const dirPath = path.resolve(this.gatsbyTheme, 'src/pages', subPath);
          if (!fs.existsSync(dirPath)) fs.mkdirsSync(dirPath);
          fs.copySync(file, path.resolve(dirPath, fileName));
        });
        return resolve(files);
      });
    });
    const pkgPath = path.resolve(paths.docs, 'package.json');
    if (fs.existsSync(pkgPath)) {
      fs.copySync(
        pkgPath,
        path.resolve(this.gatsbyTheme, 'src', 'package.json')
      );
    }
    fs.copySync(
      path.resolve(buildPath, 'jekyll'),
      fs.realpathSync(path.resolve(this.gatsbyTheme, 'src/pages'))
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
      const cp = crossSpawn('node', [this.gatsbyCli, ...args], {
        cwd: this.gatsbyTheme,
        stdio: 'inherit'
      });
      cp.on('close', resolve);
      cp.on('error', reject);
    });
  }
}
