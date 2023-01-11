/* config-overrides.js */
const ComponentTrackingWebpackPlugin = require('component-tracking-plugin');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.plugins.push(
    new ComponentTrackingWebpackPlugin({
      libraryName: 'ui-toolkit',
    })
  );
  return config;
};
