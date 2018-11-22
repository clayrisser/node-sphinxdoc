function requireModule(moduleName) {
  const module = require(moduleName);
  if (module.__esModule) return module.default;
  return module;
}

export { requireModule };
export default { requireModule };
