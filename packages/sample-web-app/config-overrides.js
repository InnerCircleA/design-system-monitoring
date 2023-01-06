/* config-overrides.js */
const ComponentTrackingPlugin = require("component-tracking-plugin");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.plugins.push(new ComponentTrackingPlugin());
  return config;
};
