const pluginName = 'ComponentTrackingWebpackPlugin';

class ComponentTrackingWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('The webpack build process is starting!');
    });
  }
}

module.exports = ComponentTrackingWebpackPlugin;