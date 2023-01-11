class ComponentTrackingWebpackPlugin {
  constructor(options = {}) {
    this.trackingModule = options.trackingModule;
    this.pageAnotation = options.pageAnotation;

    // TODO: 각 Compilation 과정 사이에 공유되야할 정보를 담는 곳

  }

  apply(compiler) {
    const className = this.constructor.name;

    compiler.hooks.normalModuleFactory.tap(className, (factory) => {
      factory.hooks.parser
        .for("javascript/auto")
        .tap(className, (parser, options) => {
          parser.hooks.statement.tap(className, (statement) => {
            // TODO: AST Analysis 를 통한 필요한 데이터 수집
          });
        });
    });

    compiler.hooks.compilation.tap(className, (compilation) => {
      compilation.hooks.finishModules.tap(className, (modules) => {
        const {
          moduleGraph: { _moduleMap: moduleMap },
        } = compilation;

        // TODO: 모듈간의 그래프 관계를 이용한 데이터 연결         

      });
    });

    compiler.hooks.done.tap(className, () => {
      // TODO: 수집된 정보를 외부로 추출
    });
  }
}

export default ComponentTrackingWebpackPlugin;