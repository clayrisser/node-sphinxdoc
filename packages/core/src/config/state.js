export default class State {
  _config = {};

  set config(config) {
    Object.keys(this._config).forEach(key => {
      delete this._config[key];
    });
    Object.assign(this._config, config);
    return this._config;
  }

  get config() {
    return this._config;
  }
}
