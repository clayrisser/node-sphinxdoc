import Err from 'err';
import _ from 'lodash';
import path from 'path';
import pkgDir from 'pkg-dir';

export class PlatformLoader {
  get platformModuleNames() {
    if (this._platformModuleNames) return this._platformModuleNames;
    const projectPath = path.resolve(pkgDir.sync(process.cwd()));
    const pkg = require(path.resolve(projectPath, 'package.json'));
    const platformModuleNames = _.keys(pkg.dependencies);
    this._platformModuleNames = _.filter(
      platformModuleNames,
      platformModuleName => {
        return !!require(path.resolve(
          projectPath,
          'node_modules',
          platformModuleName,
          'package.json'
        )).sphinxdocPlatform;
      }
    );
    return this._platformModuleNames;
  }

  get platforms() {
    if (this._platforms) return this._platforms;
    this._platforms = _.reduce(
      this.platformModuleNames,
      (platforms, platformModuleName) => {
        let platform = this.getPlatform(platformModuleName);
        if (!platform.name) throw new Err('platform must have a name');
        if (_.includes(_.keys(platforms), platform.name)) {
          throw new Err(
            `platform with the name '${platform.name}' already loaded`
          );
        }
        platform.moduleName = platformModuleName;
        const self = this;
        platform = {
          ...platform,
          get module() {
            return self.getPlatformModule(platformModuleName);
          }
        };
        platforms[platform.name] = platform;
        return platforms;
      },
      {}
    );
    return this._platforms;
  }

  getPlatform(platformModuleName) {
    const platformPath = pkgDir.sync(
      require.resolve(platformModuleName, {
        paths: [path.resolve(pkgDir.sync(process.cwd()), 'node_modules')]
      })
    );
    const pkg = require(path.resolve(platformPath, 'package.json'));
    const platformConfig = require(path.resolve(
      platformPath,
      pkg.sphinxdocPlatform
    ));
    if (platformConfig.__esModule) return platformConfig.default;
    return platformConfig;
  }

  getPlatformModule(platformModuleName) {
    const platformModulePath = pkgDir.sync(
      require.resolve(platformModuleName, {
        paths: [path.resolve(pkgDir.sync(process.cwd()), 'node_modules')]
      })
    );
    const platformModule = require(platformModulePath);
    if (platformModule.__esModule) return platformModule.default;
    return platformModule;
  }
}

const platformLoader = new PlatformLoader();

export default platformLoader.platforms;
