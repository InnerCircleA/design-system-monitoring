/** @type {import('next').NextConfig} */

const ComponentTrackingWebpackPlugin = require('component-tracking-plugin');

const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (config.mode === 'production') {
      config.plugins.push(
        new ComponentTrackingWebpackPlugin({
          libraryName: 'ui-toolkit',
        })
      );
    }
    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
