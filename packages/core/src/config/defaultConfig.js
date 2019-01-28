import path from 'path';
import pkgDir from 'pkg-dir';

const rootPath = pkgDir.sync(process.cwd());
const pkg = require(path.resolve(rootPath, 'package.json'));

export default {
  author: pkg.author?.name || pkg.author || '',
  description: pkg.description || '',
  name: pkg.name || '',
  open: false,
  output: 'html',
  platforms: {},
  port: 3000,
  readme: true,
  serve: false,
  src: 'src'
};
