import crossSpawn from 'cross-spawn';
import fs from 'fs-extra';
import path from 'path';
import pkgDir from 'pkg-dir';
import { Platform } from '@sphinxdoc/core';

export default class Rtd extends Platform {
  async build() {
    return this.gatsby(['build']);
  }

  async start() {
    return this.gatsby(['develop']);
  }

  async gatsby(args) {
    const gatsbyCli = path.resolve(
      pkgDir.sync(
        require.resolve('gatsby-cli', {
          paths: path.resolve(pkgDir.sync(process.cwd()), 'node_modules')
        })
      ),
      'lib/index.js'
    );
    const gatsbyTheme = pkgDir.sync(
      require.resolve('@sphinxdoc/gatsby-theme', {
        paths: path.resolve(pkgDir.sync(process.cwd()), 'node_modules')
      })
    );
    return new Promise((resolve, reject) => {
      const cp = crossSpawn('node', [gatsbyCli, ...args], {
        cwd: gatsbyTheme,
        stdio: 'inherit'
      });
      cp.on('close', resolve);
      cp.on('error', reject);
    });
  }
}
