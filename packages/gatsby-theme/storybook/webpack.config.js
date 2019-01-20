const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const pkgDir = require('pkg-dir');
const getRules = require('./getRules');

const paths = {
  root: pkgDir.sync(process.cwd())
};
const babel = fs.readJsonSync(
  path.resolve(pkgDir.sync(process.cwd()), '.babelrc')
);

fs.mkdirsSync(path.resolve(paths.root, '.cache'));
fs.writeJsonSync(path.resolve(paths.root, '.cache/babelState.json'), {});

module.exports = webpackConfig => {
  webpackConfig.resolve.extensions.unshift('.web.js');
  webpackConfig.resolve.alias = {
    ...webpackConfig.resolve.alias,
    '~': path.resolve(pkgDir.sync(process.cwd()), 'src')
  };
  webpackConfig = replaceBabelRule(webpackConfig, {
    test: /\.(js|jsx|mjs)$/,
    include: [
      path.resolve(pkgDir.sync(process.cwd()), 'src'),
      path.resolve(pkgDir.sync(process.cwd()), 'stories')
    ],
    loader: require.resolve('babel-loader'),
    options: babel
  });
  webpackConfig.module.rules = [...webpackConfig.module.rules, ...getRules()];
  return webpackConfig;
};

function replaceBabelRule(webpackConfig, rule) {
  const babelRule = _.find(webpackConfig.module.rules, rule => {
    return !!_.find(
      _.isArray(rule.use) ? rule.use : [],
      rule => rule.loader.indexOf('babel-loader') > -1
    );
  });
  _.each(_.keys(babelRule), key => {
    delete babelRule[key];
  });
  _.assign(babelRule, rule);
  return webpackConfig;
}
