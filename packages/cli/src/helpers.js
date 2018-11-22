import path from 'path';
import pkgDir from 'pkg-dir';

function requireModule(moduleName) {
  const modulePath = pkgDir.sync(
    require.resolve(moduleName, {
      paths: [path.resolve(pkgDir.sync(process.cwd()), 'node_modules')]
    })
  );
  const module = require(modulePath);
  if (module.__esModule) return module.default;
  return module;
}

export { requireModule };
export default { requireModule };
