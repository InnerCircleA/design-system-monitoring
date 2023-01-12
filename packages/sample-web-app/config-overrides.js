/* config-overrides.js */
const ComponentTrackingWebpackPlugin = require('component-tracking-plugin');

module.exports = {
  webpack: (config, env) => {
    if (config.mode === "production") {
      config.plugins.push(
        new ComponentTrackingWebpackPlugin({
          libraryName: 'ui-toolkit',
        })
      );
    }

    return config;
  }
}

